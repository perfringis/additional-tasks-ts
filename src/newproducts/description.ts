import { NotAcceptableException } from '@nestjs/common';

export class Description {
  private desc: string;
  private longDesc: string;

  constructor(desc: string, longDesc: string) {
    if (longDesc === null || desc === null) {
      throw new NotAcceptableException('null or empty desc');
    }

    this.desc = desc;
    this.longDesc = longDesc;
  }

  public isEmpty() {
    return this.longDesc.length === 0 || this.desc.length === 0;
  }

  public replace(charToReplace: string, replaceWith: string): Description {
    return new Description(
      this.desc.replace(charToReplace, replaceWith),
      this.longDesc.replace(charToReplace, replaceWith),
    );
  }

  public format(): string {
    if (this.isEmpty()) {
      return '';
    }

    return this.desc + ' *** ' + this.longDesc;
  }

  public getDesc(): string {
    return this.desc;
  }

  public getLongDesc(): string {
    return this.longDesc;
  }
}
