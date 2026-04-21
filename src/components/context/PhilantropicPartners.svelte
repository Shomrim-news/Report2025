<h2 id="partners" class="as-h1">Philanthropic Partners</h2>
<div class="text-[22px] leading-8.5 tracking-[-1%]">
  We wish to thank all our partners; their invaluable support makes our mission possible.
</div>

<div>
  <h3>Founders</h3>
  <div>Laura and Gary Lauder Family Venture Philanthropy Fund</div>
</div>

<div class="partners-container">
  <div class="leaders-section">
    <h3 class="mt-19.75 mb-2.5">Leaders</h3>
    <ul class="w-full">
      <li>The Moriah Fund, New York, NY</li>
      <li>The Charles H. Revson Foundation, New York, NY</li>
      <li>Anonymous</li>
      <li>Anonymous</li>
      <li>Anonymous</li>
    </ul>
  </div>

  <div class="guardians-section">
    <h3 class="mt-19.75 mb-2.5">Guardians</h3>
    <ul class="w-full">
      <li>Gerson Bakar Foundation, San Francisco, CA</li>
      <li>Dan David Foundation, Vaduz, Liechtenstein</li>
      <li>The Feldman Foundation, San Francisco, CA</li>
      <li>German-Israeli Future Forum Foundation, Berlin, Germany</li>
      <li>Libitzky Family Foundation, San Francisco, CA</li>
      <li>LSE & Google News Initiative</li>
      <li>The Meyer and Deanne Sharlin Foundation, Bethesda, MD</li>
      <li>March & Lauren Shenfield</li>
      <li>Anonymous</li>
    </ul>
  </div>

  <div class="friends-section">
    <h3 class="mt-24.25 mb-2.5">Friends</h3>
    <ul class="w-full">
      <li>Doris Arkin</li>
      <li>Karen Falk and Michael Goldman</li>
      <li>Valerie Feigen and Steven Eisman</li>
    </ul>
  </div>
</div>

<style>
  li {
    display: flex;
    align-items: center;
    height: 4rem;
    font-size: 1rem;
    line-height: 1.4rem;
    border-bottom: 0.5px solid var(--color-beige-600);
  }
  .partners-container {
    position: relative;
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: auto auto;
    grid-template-areas:
      'leaders guardians'
      'friends guardians';
    column-gap: 106px;
  }
  .leaders-section {
    grid-area: leaders;
  }
  .guardians-section {
    grid-area: guardians;
  }
  .friends-section {
    grid-area: friends;
  }

  @media (max-width: 767px) {
    .partners-container {
      display: flex;
      flex-direction: column;
    }
  }
  .partners-container::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: url('../../lib/assets/logo_2.svg');
    background-repeat: no-repeat;
    background-size: 260px auto;
    background-position: 308px 426px;
    opacity: 0.68;
    pointer-events: none;
  }
  @media (min-width: 640px) {
    li {
      font-size: var(--text-md);
      line-height: 4.25rem;
    }
  }
</style>
