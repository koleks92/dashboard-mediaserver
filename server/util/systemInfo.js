const si = require("systeminformation");

async function getSystemStats() {
  let cpuLoad;
  let memTotal;
  let memAvailable;
  let hostname;
  let disks;

  // Ignored type disks
  const ignoredTypes = ["tmpfs", "devtmpfs", "squashfs"];

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
    hostname = host.hostname;

    // Disks
    const disksData = await si.fsSize();
    const disks = disksData
      .filter((d) => d.size > 0 && !ignoredTypes.includes(d.type))
      .map((d) => ({
        mount: d.mount,
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
      uptime: si.time().uptime,
      disks: disks,
    };
  } catch (err) {
    console.error(err);
    throw err;
  }
}

module.exports = { getSystemStats };
