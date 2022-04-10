import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  siteId: string;

  @Column({ default: '' })
  uuidUaIp: string; // 通过 ua + ip 标记用户

  @Column({ default: '' })
  uuid: string; // 通过 session id 标记用户

  @Column({ default: '' })
  navigationStartTime: string;

  @Column({ default: '' })
  beforeunloadTime: string;

  @Column({ default: '' })
  visitDuration: string;

  @Column({ default: '' })
  zsWindowId: string;

  @Column({ default: '' })
  ip: string;

  @Column()
  region: string;

  @Column()
  networkServe: string;

  @Column()
  count: number;

  @Column()
  referer: string;

  @Column()
  perf_load: string;

  @Column()
  perf_dom_content_loaded: string;

  @Column()
  perf_ttfb: string;

  @Column()
  performance_timing: string;

  @Column()
  perf_calcData: string;

  @Column()
  ua: string;

  @Column()
  uaInfo: string;

  @Column({ default: false })
  isMobile: boolean;

  @Column()
  platform: string;

  @Column()
  lang: string;

  @Column()
  hardware_concurrency: number;

  @Column()
  deviceMemory: number;

  @Column()
  cookieEnabled: boolean;

  @Column()
  network: string;

  @Column()
  href: string;

  @Column()
  origin: string;

  @Column()
  pathname: string;

  @Column()
  screen: string;

  @Column()
  screen_info: string;

  @Column()
  time: string;

  @Column()
  extra1: string;

  @Column()
  extra2: string;

  @Column()
  extra3: string;
}
