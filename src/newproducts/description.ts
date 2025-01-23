import { NotAcceptableException } from '@nestjs/common';
import { Column } from 'typeorm';

export class Description {
  @Column({ name: '_value', nullable: true, type: 'varchar' })
  private desc: string;

  @Column({ name: '_value', nullable: true, type: 'varchar' })
  private longDesc: string;

  constructor(desc: string, longDesc: string) {
    if (!desc) {
      throw new NotAcceptableException('Cannot have a null description');
    }

    if (!longDesc) {
      throw new NotAcceptableException('Cannot have null long description');
    }

    this.desc = desc;
    this.longDesc = longDesc;
  }

  public formatted(): string {
    if (!this.desc || !this.longDesc) {
      return '';
    }

    return this.desc + ' *** ' + this.longDesc;
  }

  public replace(charToReplace: string, replaceWith: string): Description {
    return new Description(
      this.desc.replace(charToReplace, replaceWith),
      this.longDesc.replace(charToReplace, replaceWith),
    );
  }
}
