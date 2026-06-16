export class SimplePersist<Entity> {
  /**
   * key of the content to persist in local storage
   * @protected contentKey: string
   */
  protected contentKey: string = '';
  /**
   * key in local storage for time the content expire
   * @protected expireKey: string
   */
  protected expireKey: string = '';

  private timeoutKey(): string {
    return '_' + this.expireKey;
  }

  /**
   * Value of variable
   * @protected content: any
   */
  protected content: Entity | null = null;
  /**
   * expire time in minute
   * @protected expire: number
   */
  protected expire: number = 0;

  private timeout: number = 0;

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

  public loadLocal(): any {
    const content: string | null = localStorage.getItem(this.contentKey);
    const expire: string | null = localStorage.getItem(this.expireKey);
    const timeout: string | null = localStorage.getItem(this.timeoutKey());
    if (content != null) {
      this.content = JSON.parse(atob(content));
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
