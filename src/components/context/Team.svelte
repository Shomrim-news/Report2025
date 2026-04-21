<script>
  const advisory = [
    { name: 'Richard (Rick) Altabef', title: 'Broadcast news lawyer' },
    { name: 'Ilana Dayan', title: 'Journalist, host of Channel 12 investigative TV show Uvda' },
    {
      name: 'Raviv Drucker',
      title: 'Journalist, Political Commentator; Host, investigative TV program HaMakor',
    },
    { name: 'Amos Harel', title: 'Journalist, Military Commentator for Haaretz' },
    {
      name: 'David Horovitz',
      title: 'Journalist, Founding Editor of Jerusalem-based news website The Times of Israel',
    },
    { name: 'Isaac Lee', title: 'Journalist, Entrepreneur, and Film & Television Producer' },
    {
      name: 'Robert J. Rosenthal',
      title: 'Former Executive Director, The Center for Investigative Reporting',
    },
    { name: 'Vivian Schiller', title: 'VP & Executive Director, Aspen Institute' },
    { name: 'Bret Stephens', title: 'Columnist at the New York Times' },
    { name: 'Dina Temple-Raston', title: 'Senior Correspondent for The Record' },
    { name: 'Richard Tofel', title: 'Principal, Gallatin Advisory LLC' },
    {
      name: 'Ellen Weiss',
      title: 'Chief of the Washington Bureau and Vice President of The E. W. Scripps Company',
    },
    { name: 'Ghada Zoabi', title: 'Founder and CEO of Bokra.net' },
    {
      name: 'Guy Zohar',
      title: "Journalist, News Presenter, TV Show Host, Me'hatsad Hasheni on KAN 11 channel",
    },
  ];

  const founders = [
    {
      name: 'Laura Lauder',
      title: 'Venture Philanthropist',
      photo: '/photos/founders_board/Laura_Lauder.jpg',
    },
    {
      name: 'Gary Lauder',
      title: 'Managing Director of Lauder Partners LLC',
      photo: '/photos/founders_board/Gary_Lauder.jpg',
    },
    {
      name: 'Yoel Esteron',
      title: 'Founder & Publisher, Calcalist; Chairman, Center for Media and Democracy',
      photo: '/photos/founders_board/Yoel_Esteron.jpg',
    },
    {
      name: 'Ethan Bronner',
      title: 'Senior Editor at Bloomberg',
      photo: '/photos/founders_board/Ethan_Bronner.jpg',
    },
    {
      name: 'Tami Litani',
      title: 'Former Deputy Editor in Chief, Haaretz',
      photo: '/photos/founders_board/Tami_Litani.jpg',
    },
    {
      name: 'Oded Hermoni',
      title: 'Entrepreneur, VC & Social Activist',
      photo: '/photos/founders_board/Oded_Hermoni.jpg',
    },
    {
      name: 'Vardi Kahana',
      title: 'Photojournalist',
      photo: '/photos/founders_board/Vardi_Kahana.jpg',
    },
    {
      name: 'Prof. Moshe Zviran',
      title: 'Coller School of Management at Tel Aviv University',
      photo: '/photos/founders_board/Prof_Moshe_Zviran.jpg',
    },
  ];

  const team2 = [
    {
      name: 'Fadi Amun',
      title: 'Investigative Reporter and Photographer',
      photo: '/photos/team/Fadi_Amun.jpg',
    },
    { name: 'Ayelet Benny', title: 'Office Manager', photo: '/photos/team/Ayelet_Benny.jpg' },
    { name: 'Uri Blau', title: 'Investigative Reporter', photo: '/photos/team/Uri_Blau.jpg' },
    {
      name: 'Milan Czerny',
      title: 'Investigative Reporter',
      photo: '/photos/team/Milan_Czerny.jpg',
    },
    {
      name: 'Daniel Dolev',
      title: 'Investigative Reporter',
      photo: '/photos/team/Daniel_Dolev.jpg',
    },
    {
      name: 'Dita Kohl-Roman',
      title: 'Resource Development Senior Advisor',
      photo: '/photos/team/Dita_Kohl_Roman.jpg',
    },
    {
      name: 'Michael (Miki) Levi',
      title: 'Head of Data and Infographics',
      photo: '/photos/team/Miki_Levy.jpg',
    },
    { name: 'Haim Rivlin', title: 'Investigative Reporter', photo: '/photos/team/Haim_Rivlin.jpg' },
    {
      name: 'Mayan Rodeh',
      title: 'Editor and Content Growth Manager',
      photo: '/photos/team/Mayan_Rodeh.jpg',
    },
    { name: 'Shuki Sadeh', title: 'Investigative Reporter', photo: '/photos/team/Shuki_Sadeh.jpg' },
    {
      name: 'Ron Schwartz',
      title: 'Deputy Editor and Head of Digital',
      photo: '/photos/team/Ron_Schwartz.jpg',
    },
    { name: 'Doron Sela', title: 'COO', photo: '/photos/team/Doron_Sela.jpg' },
    {
      name: 'Chen Shalita',
      title: 'Investigative Reporter',
      photo: '/photos/team/Chen_Shalita.jpg',
    },
    { name: 'Roni Singer', title: 'Investigative Reporter', photo: '/photos/team/Roni_Singer.jpg' },
    {
      name: 'Lir Spiriton',
      title: 'Investigative Reporter',
      photo: '/photos/team/Lir_Spiriton.jpg',
    },
    { name: 'Noam Tamari', title: 'Designer', photo: '/photos/team/Noam_Tamari.jpg' },
    { name: 'Neta Yaari', title: 'Social Media Manager', photo: '/photos/team/Neta_Yaari.jpg' },
  ];

  const team1 = [
    { name: 'Alona Vinograd', title: 'CEO', photo: '/photos/team/Alona_Vinograd.jpg' },
    {
      name: 'Eyal Abrahami',
      title: 'Editor-in-Chief',
      photo: '/photos/team/Eyal_Abrahami.jpg',
    },
  ];
</script>

<h2 id="team" class="as-h1">Team</h2>
<h3 style="margin-bottom: 60px;">Shomrim’s Newsroom and Staff</h3>
<div class="team1-row mb-6.5">
  {#each team1 as teamMember}
    <div class="card">
      <img src={teamMember.photo} alt={teamMember.name} class="team-photo" />
      <div class="team-info">
        <div class="name">{teamMember.name}</div>
        <div class="title">{teamMember.title}</div>
      </div>
    </div>
  {/each}
</div>
<div class="grid">
  {#each team2 as teamMember}
    <div class="card">
      <img src={teamMember.photo} alt={teamMember.name} class="team-photo" />
      <div class="team-info">
        <div class="name">{teamMember.name}</div>
        <div class="title">{teamMember.title}</div>
      </div>
    </div>
  {/each}
</div>

<h3 style="margin: 122px 0 60px;">Founders and Board Staff Members</h3>
<div class="founders-grid">
  {#each founders as member}
    <div class="card card-lg">
      <img src={member.photo} alt={member.name} class="team-photo" />
      <div class="team-info">
        <div class="name">{member.name}</div>
        <div class="title">{member.title}</div>
      </div>
    </div>
  {/each}
</div>

<h3 style="margin: 122px 0 60px;">Advisory Committee</h3>
<div class="founders-grid">
  {#each advisory as member}
    <div class="card card-lg">
      <div class="photo-placeholder"></div>
      <div class="team-info">
        <div class="name">{member.name}</div>
        <div class="title">{member.title}</div>
      </div>
    </div>
  {/each}
</div>

<div class="founders-grid" style="margin-top: 122px;">
  <div>
    <h3 style="margin-bottom: 60px;">Legal Counseling</h3>
    <div class="card card-no-photo">
      <div class="team-info team-info-full">
        <div class="name">Attorney Ofer Doron</div>
        <div class="title">Cohen, Ben-Ner, Doron<br />and Co. Law Firm</div>
      </div>
    </div>
  </div>
  <div>
    <h3 style="margin-bottom: 60px;">Audit Committee</h3>
    <div class="audit-row">
      <div class="card card-no-photo">
        <div class="team-info team-info-full">
          <div class="name">Benjamin Zeliger</div>
          <div class="title">Lawyer</div>
        </div>
      </div>
      <div class="card card-no-photo">
        <div class="team-info team-info-full">
          <div class="name">Prof. Moshe Zviram</div>
          <div class="title">Coller School of Management<br />at Tel Aviv University</div>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .founders-grid {
    display: grid;
    grid-template-columns: repeat(2, 409px);
    column-gap: 25px;
    row-gap: 26px;
  }
  @media (max-width: 580px) {
    .founders-grid {
      grid-template-columns: 409px;
    }
  }
  .team1-row {
    display: flex;
    flex-wrap: wrap;
    row-gap: 26px;
  }
  .grid {
    display: grid;
    grid-template-columns: repeat(4, 273px);
    row-gap: 26px;
  }
  @media (max-width: 1200px) {
    .grid {
      grid-template-columns: repeat(3, 273px);
    }
  }
  @media (max-width: 900px) {
    .grid {
      grid-template-columns: repeat(2, 273px);
    }
  }
  @media (max-width: 580px) {
    .grid {
      grid-template-columns: 273px;
    }
  }
  .card {
    display: flex;
    width: 273px;
  }
  .card-lg {
    width: 409px;
  }
  .card img,
  .photo-placeholder {
    width: 93px;
    height: 102px;
    object-fit: cover;
    flex-shrink: 0;
  }
  .photo-placeholder {
    background-color: color-mix(in srgb, var(--color-grey-400) 20%, transparent);
  }
  .team-info {
    width: 180px;
    padding: 24px 8px 8px;
    text-align: center;
    background-color: color-mix(in srgb, var(--color-beige-300) 32%, transparent);
  }
  .card-lg .team-info {
    width: 316px;
  }
  .card-no-photo .team-info {
    width: 272px;
  }
  .audit-row {
    display: flex;
    gap: 25px;
  }
  .audit-row .card-no-photo {
    flex: 1;
  }
  .team-info-full {
    width: 100%;
    height: 102px;
  }
  .team-info .name {
    margin-bottom: 6px;
    font-size: 1rem;
    line-height: 28px;
    letter-spacing: 2%;
  }
  .team-info .title {
    font-size: 14px;
    line-height: 18px;
    font-style: italic;
    letter-spacing: 2%;
    color: var(--color-grey-400);
  }
</style>
