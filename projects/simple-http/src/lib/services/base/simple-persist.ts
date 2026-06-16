export class SimplePersist<Entity> {
  protected contentKey = '';
  protected expireKey = '';

  private timeoutKey(): string {
    return '_' + this.expireKey;
  }

  protected content: Entity | null = null;
  protected expire = 0;

  private timeout = 0;

  constructor(content_key?: string, expire_key?: string) {
    this.contentKey = content_key ?? '';
    this.expireKey = expire_key ?? '';
  }

  public setKeys(content_key: string, expire_key: string) {
    this.contentKey = content_key;
    this.expireKey = expire_key;
    return this;
  }

  public setValues(content: Entity, expire?: number, persist?: boolean) {
    this.content = content;
    this.expire = expire ?? 0;
    this.timeout = new Date().getTime() + this.expire * 1000;
    if (persist) {
      this.persist();
    }
    return this;
  }

  public persist() {
    localStorage.setItem(this.contentKey, btoa(JSON.stringify(this.content)));
    if (this.expire > 0) {
      localStorage.setItem(this.expireKey, this.expire.toString());
      localStorage.setItem(this.timeoutKey(), this.timeout.toString());
    }
    return this;
  }

  public loadLocal(): Entity | null {
    const content: string | null = localStorage.getItem(this.contentKey);
    const expire: string | null = localStorage.getItem(this.expireKey);
    const timeout: string | null = localStorage.getItem(this.timeoutKey());
    if (content != null) {
      this.content = JSON.parse(atob(content)) as Entity;
    }
    if (expire != null) {
      this.expire = +expire;
    }
    if (timeout != null) {
      this.timeout = +timeout;
    }
    return this.content;
  }

  public hasLocal(): boolean {
    return this.loadLocal() !== null;
  }

  public inDelay(): boolean {
    return Date.now() - this.timeout <= this.expire * 1000;
  }

  public cleanLocal() {
    localStorage.removeItem(this.contentKey);
    localStorage.removeItem(this.expireKey);
    localStorage.removeItem(this.timeoutKey());
    return this;
  }
}
