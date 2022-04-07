import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  siteId: string;

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
