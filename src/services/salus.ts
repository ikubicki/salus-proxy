import it600 from "node-it600";
import APIError from "../utils/apiError";
const crypter = new it600.Crypter(process.env.SALUS_EUID || "");
const client = new it600.Client(process.env.SALUS_HOST || "", crypter);

type SalusDevice = {
  ident: {
    UniID: string,
  },
  ModelIdentifier: string,
  name: string,
  OnlineStatus: string,
  temperature: string,
  currentTemperature: string,
  isRunning: string,
  mode: string,
  humidity: string,
  BatteryLevel: string,
}

function deviceMapper(device: SalusDevice) {
  return {
    id: device.ident?.UniID,
    model: device.ModelIdentifier,
    name: device.name,
    online: device.OnlineStatus,
    temperature: device.temperature,
    currentTemperature: device.currentTemperature,
    isRunning: device.isRunning,
    mode: device.mode,
    humidity: device.humidity,
    battery: device.BatteryLevel,
  };
}

async function getDevices() {
  return client.send(new it600.commands.ListDevices()).then((devices) => {
    if (Array.isArray(devices)) {
      return devices.filter((device) => "HoldType" in device).map(deviceMapper);
    }
    return [];
  });
}

async function getDevice(id: string) {
  return client.send(new it600.commands.GetDevice(id)).then((device) => {
    if (device) {
      return deviceMapper(device);
    }
    throw new APIError("Unknown device", 404);
  });
}

async function setTemperature(id: string, temperature: number) {
  return client
    .send(new it600.commands.GetDevice(id))
    .then((device) => {
      if (device) {
        return device.setTemperature(temperature);
      }
      throw new APIError("Unknown device", 404);
    })
    .then((result) => ({ result }));
}

async function setMode(id: string, mode: number) {
  return client
    .send(new it600.commands.GetDevice(id))
    .then((device) => {
      if (device) {
        return device.setMode(mode);
      }
      throw new APIError("Unknown device", 404);
    })
    .then((result) => ({ result }));
}

export default {
  getDevices,
  getDevice,
  setTemperature,
  setMode,
};
