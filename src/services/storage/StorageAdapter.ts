export interface StorageAdapter {
  getItem<T>(key: string): Promise<T | null>;
  setItem<T>(key: string, value: T): Promise<void>;
  removeItem(key: string): Promise<void>;
}

export class LocalStorageAdapter implements StorageAdapter {
  async getItem<T>(key: string): Promise<T | null> {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    localStorage.setItem(key, JSON.stringify(value));
  }

  async removeItem(key: string): Promise<void> {
    localStorage.removeItem(key);
  }
}

// Adapter para quando tivermos uma API REST
export class ApiStorageAdapter implements StorageAdapter {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async getItem<T>(key: string): Promise<T | null> {
    const response = await fetch(`${this.baseUrl}/${key}`);
    if (!response.ok) return null;
    return response.json();
  }

  async setItem<T>(key: string, value: T): Promise<void> {
    await fetch(`${this.baseUrl}/${key}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(value),
    });
  }

  async removeItem(key: string): Promise<void> {
    await fetch(`${this.baseUrl}/${key}`, { method: 'DELETE' });
  }
}