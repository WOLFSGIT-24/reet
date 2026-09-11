import React from 'react';

export default function Hero({ onOpenJoinModal }) {
  return (
    <section className="hero">
      <div className="wrap">
        <div className="tag">Strength in numbers. Proof in price.</div>

        <h1>
          The price a channel<br />
          partner gets — now<br />
          yours to share.
        </h1>

        <p className="lede">
          REET Spaces pools verified buyers into purchase groups for Hyderabad's strongest new launches — turning our channel-partner leverage with developers into a price advantage you can actually see, upfront.
        </p>

        <div className="hero-stats">
          <div className="stat">
            <b>8</b>
            <span>verified group-buy projects</span>
          </div>
          <div className="stat">
            <b>4+</b>
            <span>buyers unlocks group pricing</span>
          </div>
          <div className="stat">
            <b>₹1.4Cr–5.1Cr</b>
            <span>price range across projects</span>
          </div>
        </div>
      </div>
    </section>
  );
}
