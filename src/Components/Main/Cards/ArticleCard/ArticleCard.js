import React from 'react';
import Button from '../../../Buttons/Button/Button';

const ArticleCard = () => {
  return (
    <article className="article-card">
      <h3>ARTICLE CARD</h3>
      <Button className="btn-sm btn-solid">BUTTON</Button>
      <Button className="btn-md btn-solid">BUTTON</Button>
      <Button className="btn-lg btn-solid">BUTTON</Button>
      <br />
      <Button className="btn-sm btn-regular">BUTTON</Button>
      <Button className="btn-md btn-regular">BUTTON</Button>
      <Button className="btn-lg btn-regular">BUTTON</Button>
      <br />
      <Button className="btn-sm btn-secondary">BUTTON</Button>
      <Button className="btn-md btn-secondary">BUTTON</Button>
      <Button className="btn-lg btn-secondary">BUTTON</Button>
    </article>
  );
};

export default ArticleCard;
