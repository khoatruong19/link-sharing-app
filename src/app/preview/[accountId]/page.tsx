import React from 'react';

type Props = {};

const PreviewPage = (props: { params: { accountId: string } }) => {
  console.log(props.params.accountId);
  return <div>PreviewPage</div>;
};

export default PreviewPage;
