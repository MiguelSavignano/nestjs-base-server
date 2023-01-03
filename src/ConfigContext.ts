export class ConfigContext {
  constructor(private request) {}
  get current() {
    return {
      user: {
        id: this.request.headers['x-user-id'] || null,
        language: this.request.headers.language || null,
      },
    };
  }
}
