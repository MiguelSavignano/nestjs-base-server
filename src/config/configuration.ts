export default () => ({
  port: toInt(process.env.PORT) || 3000,
  opentelemetry: {
    serviceName: process.env.OPENTELEMETRY_SERVICE_NAME,
  },
});

function toInt(value: string) {
  return parseInt(value, 10);
}
