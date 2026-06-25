import { Helmet } from 'react-helmet-async';

export default function SEOPageWrapper({ title, description, children }) {
  return (
    <>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      {children}
    </>
  );
}

