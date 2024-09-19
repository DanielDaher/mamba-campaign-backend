import crypto from 'crypto';

class CodeHelper {
  private generateCode(): string {
    // generates random number between 0000 and 9999.
    return crypto.randomInt(10000).toString().padStart(4, '0');
  }

  private generateExpiresIn(minutes: number): Date {
    const now = new Date();
    return new Date(now.setMinutes(now.getMinutes() + minutes));
  }

  public generate(minutes: number): { code: string, codeExpiresIn: Date } {
    return {
      code: this.generateCode(),
      codeExpiresIn: this.generateExpiresIn(minutes),
    };
  }

  public isExpired(codeExpiresIn: Date): boolean {
    const now = new Date();
    return (codeExpiresIn.getTime() - now.getTime() <= 0);
  }
}

export default new CodeHelper();
