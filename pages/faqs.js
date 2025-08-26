import Head from 'next/head';

export default function FAQPage() {
  const faqs = [
    {
      q: 'How does the escrow process work?',
      a: 'All transactions are processed via an independent escrow service. Once buyer and seller agree on terms, funds are deposited into escrow. The domain is transferred, the buyer confirms receipt and funds are released to the seller.'
    },
    {
      q: 'Can I lease a domain with an option to buy?',
      a: 'Yes. Most lease agreements include a buyout clause where a portion of your lease payments is credited toward a final purchase price.'
    },
    {
      q: 'What payment methods do you accept?',
      a: 'We accept bank transfers and major credit cards via our escrow partner. All payments are secured and compliant.'
    },
    {
      q: 'Are your domain prices negotiable?',
      a: 'Certain premium assets have fixed pricing while others accept offers. Our team can advise on reasonable offer ranges.'
    }
  ];
  return (
    <>
      <Head>
        <title>FAQs | Hoshi Vault</title>
        <meta name="description" content="Frequently asked questions about domain leasing, buying and our escrow process." />
      </Head>
      <div className="container" style={{ padding: 'var(--space-5) 0' }}>
        <h1>Frequently Asked Questions</h1>
        <div style={{ marginTop: 'var(--space-3)' }}>
          {faqs.map((item, idx) => (
            <div key={idx} style={{ marginBottom: 'var(--space-3)' }}>
              <h3 style={{ marginBottom: 'var(--space-1)' }}>{item.q}</h3>
              <p>{item.a}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}