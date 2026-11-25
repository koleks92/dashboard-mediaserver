const si = require("systeminformation");

async function getSystemStats() {
  let cpuLoad;
  let memTotal;
  let memAvailable;
  let hostname;
  let ip;

  const wantedMounts = {
    "/": "/",
    "/host/mnt/media": "/mnt/media",
  };

  try {
    // CPU
    const currentLoad = await si.currentLoad();
    cpuLoad = currentLoad.currentLoad;

    // Memory
    const memory = await si.mem();
    memTotal = memory.total;
    memAvailable = memory.available;

    // Host
    const host = await si.osInfo();
    hostname = process.env.SERVER_NAME ?? host.hostname;
    ip = process.env.SERVER_IP;

    // Disks
    const disksData = await si.fsSize();
    const disks = disksData
      .filter((d) => Object.hasOwn(wantedMounts, d.mount))
      .map((d) => ({
        mount: wantedMounts[d.mount],
        total: d.size,
        used: d.used,
        free: d.available,
      }));

    return {
      cpuLoad: Math.round(cpuLoad),
      memTotal: memTotal,
      memAvailable: memAvailable,
      memUsed: memTotal - memAvailable,
      hostname: hostname,
      ip: ip,
      uptime: si.time().uptime,
      disks: disks,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getSystemStats };
