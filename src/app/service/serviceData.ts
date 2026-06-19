import type { ServicePageSectionProps } from '@/components/service/ServicePageSection';

export const serviceSections: ServicePageSectionProps[] = [
  {
    sectionNumber: '01',
    title: 'BASIC',
    lead: ['ビジョンの実現のために', 'これらのサービスを提供しています'],
    imageSrc: '/images/top/service-01.webp',
    imageAlt: 'BASICサービス イメージ',
    items: [
      { id: '01-01', title: '毎月の訪問サポート' },
      {
        id: '01-02',
        title: '会社の業績をすぐに見える化',
        defaultOpen: true,
        description: [
          'クラウド型会計ソフトの導入によりお客様ご自身で経理処理を行えるようにサポートします。',
          '自社で経理処理を完了させる事で最新の業績を把握することができます。',
          'いつでもどこでも最新の業績を把握できる事により、タイムリーな経営判断ができます。',
        ],
      },
      { id: '01-03', title: '決算書・申告書に保証書を発行' },
      { id: '01-04', title: '予算作成による伴奏サポート' },
      { id: '01-05', title: 'リスク算定による企業防衛' },
      { id: '01-06', title: '事業承継・資産防衛サポート' },
      { id: '01-07', title: 'その他専門家との連携' },
    ],
  },
  {
    sectionNumber: '02',
    title: 'CONSULTING',
    lead: [
      '通常業務の他にも高付加価値な',
      'コンサルティングサービスをご用意しています',
    ],
    imageSrc: '/images/top/service-02.webp',
    imageAlt: 'CONSULTINGサービス イメージ',
    items: [
      {
        id: '02-01',
        title: 'キャッシュフロー改善＆ビジョン実現コンサルティング',
      },
      {
        id: '02-02',
        title: '理念策定＆浸透コンサルティング',
        defaultOpen: true,
        description: [
          '仕事を「ナゼするのか？」「仕事で何を実現するのか？」「仕事をどんなことを大切にしながら行うのか？」を言葉にしていき、人が自立的に動き成果が上がる仕組みづくりをします。',
          '「本当に伝えたいこと」を「伝わる」レベルで言葉にした者である「理念」を、経営者を含む働く全ての人が「自分ごと」としてとらえる事で浸透し、成果に直結する仕組みづくりを進めていきます。',
        ],
      },
      { id: '02-03', title: '採用定着コンサルティング' },
      { id: '02-04', title: '資産増加コンサルティング' },
      { id: '02-05', title: '待遇コンサルティング' },
    ],
  },
];
