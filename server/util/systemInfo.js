const si = require("systeminformation");

async function getSystemStats() {
  let cpuLoad;
  let memTotal;
  let memAvailable;
  let hostname;
  let disks;
  try {
    // CPU
    const currentLoad = await si.currentLoad()
    cpuLoad = currentLoad.currentLoad

    // Memory
    const memory = await si.mem();
    memTotal = memory.total;
    memAvailable = memory.available;

    // Host
    const host = await si.osInfo();
    hostname = host.hostname;

    // Disks
    // TODO

    return {
      cpuLoad: Math.round(cpuLoad),
      memTotal: memTotal,
      memAvailable: memAvailable,
      memUsed: memTotal - memAvailable,
      hostname: hostname,
      uptime: si.time().uptime
    }
;
  } catch (err) {
    console.error(err);
    throw err;
  }

}

module.exports = { getSystemStats };
