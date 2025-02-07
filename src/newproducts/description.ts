import { NotAcceptableException } from '@nestjs/common';
import { Column } from 'typeorm';

export class Description {
  @Column({ name: '_short', nullable: true, type: 'varchar' })
  private short: string;

  @Column({ name: '_long', nullable: true, type: 'varchar' })
  private long: string;

  constructor(short: string, long: string) {
    if (short === null) {
      throw new NotAcceptableException('Cannot have a null description');
    }

    if (long === null) {
      throw new NotAcceptableException('Cannot have null long description');
    }

    this.short = short;
    this.long = long;
  }

  public formatted(): string {
    if (!this.short || !this.long) {
      return '';
    }

    return this.short + ' *** ' + this.long;
  }

  public replace(charToReplace: string, replaceWith: string): Description {
    return new Description(
      this.short.replace(charToReplace, replaceWith),
      this.long.replace(charToReplace, replaceWith),
    );
  }
}
