import domains from '../../data/domains.json';

export default function handler(req, res) {
  const records = domains.map((d) => ({
    name: d.name,
    tld: d.tld,
    length: d.length,
    categories: d.categories,
    status: d.status,
    price_type: d.price_type,
    price_value: d.price_value,
    lease_terms: d.lease_terms,
    age: d.age,
    traffic_estimate: d.traffic_estimate,
    slug: d.slug
  }));
  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Cache-Control', 'public, max-age=0, s-maxage=60, stale-while-revalidate=60');
  res.status(200).json(records);
}