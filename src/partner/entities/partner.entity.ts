import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("gender", ["gender"], {})
@Index("actived", ["actived"], {})
@Index("phone", ["phone"], {})
@Index("email", ["email"], {})
@Entity("partners", { schema: "nestjs_seller" })
export class PartnersEntity {
  @PrimaryGeneratedColumn({ type: "bigint", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "name",
    nullable: true,
    length: 255,
    default: () => "''",
  })
  name: string | null;

  @Column("timestamp", {
    name: "birthday",
    nullable: true,
    default: () => "'0000-00-00 00:00:00'",
  })
  birthday: Date | null;

  @Column("tinyint", {
    name: "gender",
    nullable: true,
    comment: "1: nữ | 2: Nam",
    unsigned: true,
    default: () => "'0'",
  })
  gender: number | null;

  @Column("varchar", { name: "email", length: 191, default: () => "''" })
  email: string;

  @Column("varchar", {
    name: "phone",
    nullable: true,
    length: 20,
    default: () => "''",
  })
  phone: string | null;

  @Column("varchar", {
    name: "address",
    nullable: true,
    length: 191,
    default: () => "''",
  })
  address: string | null;

  @Column("tinyint", {
    name: "actived",
    nullable: true,
    unsigned: true,
    default: () => "'1'",
  })
  actived: number | null;

  @Column("tinyint", {
    name: "locked",
    nullable: true,
    unsigned: true,
    default: () => "'0'",
  })
  locked: number | null;

  @Column("varchar", {
    name: "image_avatar",
    nullable: true,
    length: 191,
    default: () => "''",
  })
  imageAvatar: string | null;

  @Column("timestamp", {
    name: "updated_at",
    nullable: true,
    default: () => "'0000-00-00 00:00:00'",
  })
  updatedAt: Date | null;

  @Column("timestamp", {
    name: "created_at",
    nullable: true,
    default: () => "'0000-00-00 00:00:00'",
  })
  createdAt: Date | null;
}
