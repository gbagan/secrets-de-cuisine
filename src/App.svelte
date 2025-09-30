<script lang="ts">
  const cipherTitle = "Dgpgzzg mg pdgigc";
  const cipherText =
    "Agzzdg zdtfc pgwzc kdvaagc mg uvdfwg mvwc rw cvsvmfgd gz utdagd rw irfzc. Votrzgd zdtfc tgruc gwzfgdc, zdtfc prfssgdgc v ctrig mg crpdg gz pfwnrvwzg kdvaagc mg lgrddg utwmr. Agsvwkgd mgsfpvzgagwz vxgp rw utrgz gw votrzvwz vr urd gz v agcrdg ctfyvwzg pgwzfsfzdgc mg svfz. Sv ivzg vfwcf tlzgwrg mtfz vxtfd rwg ptwcfczvwpg m’rw sfnrfmg sgkgdgagwz givfc. Uvfdg pevruugd rwg itgsg vxgp rw igr m’erfsg. Xgdcgd rwg strpeg mg ivzg. Vzzgwmdg nrg sv pdgig ctfz prfzg m’rw ptzg vxvwz mg sv dgztrdwgd. Sv svfccgd prfdg crd sg mgryfgag ptzg. Dgptaagwpgd orcnr’v girfcgagwz mg sv ivzg. Ltw viigzfz !";

  const frenchFrequency: [string, string][] = [
    ["E", "17,38 %"],
    ["A", "8,2 %"],
    ["S", "7,93 %"],
    ["I", "7,53 %"],
    ["N", "7,17 %"],
    ["T", "6,99 %"],
    ["R", "6,65 %"],
    ["L", "5,92 %"],
    ["U", "5,73 %"],
    ["O", "5,53 %"],
    ["D", "4,01 %"],
    ["C", "3,33 %"],
    ["M", "2,97 %"],
    ["P", "2,92 %"],
    ["V", "1,39 %"],
    ["G", "1,09 %"],
    ["F", "1,08 %"],
    ["Q", "1,04 %"],
    ["H", "0,93 %"],
    ["B", "0,92 %"],
    ["X", "0,47 %"],
    ["J", "0,34 %"],
    ["Y", "0,31 %"],
    ["Z", "0,1 %"],
    ["K", "0,06 %"],
    ["W", "0,04 %"],
  ];

  const cipherFrequency: [string, string][] = [
    ["G", "19,67 %"],
    ["Z", "8,61 %"],
    ["V", "7,99 %"],
    ["D", "7,79 %"],
    ["R", "7,79 %"],
    ["W", "6,79 %"],
    ["F", "6,35 %"],
    ["C", "5,94 %"],
    ["T", "4,71 %"],
    ["P", "4,3 %"],
    ["M", "3,89 %"],
    ["S", "3,89 %"],
    ["A", "2,87 %"],
    ["I", "2,66 %"],
    ["U", "1,84 %"],
    ["X", "1,02 %"],
    ["K", "0,82 %"],
    ["N", "0,82 %"],
    ["E", "0,61 %"],
    ["L", "0,61 %"],
    ["O", "0,61 %"],
    ["Y", "0,41 %"],
    ["B", "0 %"],
    ["H", "0 %"],
    ["J", "0 %"],
    ["Q", "0 %"],
  ];

  const isAlphaChar = (ch: string) => ch.length === 1 && /[A-Za-z]/.test(ch);

  const decryptLetter = (letter: string, substitution: Record<string, string>) =>
    substitution[letter] ||
    substitution[letter.toUpperCase()]?.toLowerCase() ||
    (isAlphaChar(letter) ? "-" : letter);

  const decryptText = (cipher: string, substitution: Record<string, string>) => {
    let decrypted = ""
    for (let i = 0; i < cipher.length; i++) {
      decrypted += decryptLetter(cipher[i], substitution);
    }
    return decrypted;
  }

  let substitution: Record<string, string> = $state({});
  let replaceFrom: string = $state("");
  let replaceTo: string = $state("");
  let decryptedTitle: string = $derived(decryptText(cipherTitle, substitution));
  let substitutionValues: Set<string> = $derived(new Set(Object.values(substitution)));

  const reset = () => {
    substitution = {};
    replaceFrom = "";
    replaceTo = "";
  };

  const solution = () => {
    substitution = {
      D: "R",
      G: "E",
      P: "C",
      Z: "T",
      M: "D",
      I: "P",
      V: "A",
      R: "U",
      W: "N",
      F: "I",
      C: "S",
      T: "O",
      S: "L",
      A: "M",
      U: "F",
      X: "V",
      K: "G",
      N: "Q",
      E: "H",
      L: "B",
      O: "J",
      Y: "X"
    };
  };

  const replace = () => {
    const oldLetter = replaceFrom.toUpperCase();
    const newLetter = replaceTo.toUpperCase();
    if (!isAlphaChar(oldLetter)) {
      return;
    }
    if (isAlphaChar(newLetter)) {
      substitution[oldLetter] = newLetter;
    } else {
      delete substitution[oldLetter];
    }
  };
</script>

{#snippet texts()}
  <div class="texts_container">
    <div class="titles">
      <h3 class="ciphertitle">{cipherTitle}</h3>
      <h3 class="decryptedtitle">{decryptedTitle}</h3>
    </div>
    <div class="texts">
      {#each cipherText.split(" ") as word}
        <div class="word">
          {#each Array.from(word) as letter}
            <div class="letter">
              <div class="texts_letter_cipher">{letter}</div>
              <div class="texts_letter_decrypted">{decryptLetter(letter, substitution)}</div>
            </div>
          {/each}
          &nbsp;&nbsp;
        </div>
      {/each}
    </div>
    <div class="replace_what">
      <div class="replace_what_texts">
        <div class="replace_what_item">
          <label for="replacefrom">Lettre à remplacer :</label>
          <input
            id="replacefrom"
            type="text"
            maxlength="1"
            bind:value={replaceFrom}
            required
          />
        </div>
        <div class="replace_what_item">
          <label for="replaceto">Remplacer par :</label>
          <input
            id="replaceto"
            type="text"
            maxlength="1"
            bind:value={replaceTo}
            required
          />
        </div>
      </div>
      <div class="replace_what_buttons">
        <input class="button" value="Remplacer" onclick={replace} />
      </div>
    </div>
  </div>
{/snippet}

{#snippet tables()}
  <div class="tables_container">
    <h2>Fréquences des lettres</h2>
    <div class="tables">
      <div class="one_table">
        <h3>Dans le texte</h3>
        <table class="letter_frequency">
          <tbody>
            <tr>
              <th>Lettre</th>
              <th>Fréquence</th>
            </tr>
            {#each cipherFrequency as [letter, freq]}
              <tr>
                <td class={{decrypted_letter: !!substitution[letter]}}>{letter}</td>
                <td class={{decrypted_letter: !!substitution[letter]}}>{freq}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
      <div class="one_table">
        <h3>Dans la langue française</h3>
        <table class="letter_frequency">
          <tbody>
            <tr>
              <th>Lettre</th>
              <th>Fréquence</th>
            </tr>
            {#each frenchFrequency as [letter, freq]}
              <tr>
                <td class={{decrypted_letter: substitutionValues.has(letter)}}>{letter}</td>
                <td class={{decrypted_letter: substitutionValues.has(letter)}}>{freq}</td>
              </tr>
            {/each}
          </tbody>
        </table>
      </div>
    </div>
  </div>
{/snippet}

<div class="flex">
  <div class="header">
    <h1>(Dé)chiffrement par substitution</h1>
    <div class="header_buttons_container">
      <button class="header_button" onclick={reset}>&#8635;</button>
      <button class="header_button" onclick={solution}>&#9998;</button>
    </div>
  </div>
  <div class="content">
    {@render texts()}
    {@render tables()}
  </div>
</div>

<style>
  h1 {
    color: var(--nice-orange);
    font-family: sans-serif;
    font-size: 50px;
    font-variant: small-caps;
    align-self: start;
    margin: 20px 0px;
  }

  h2 {
    font-family: sans-serif;
    font-size: 30px;
    font-variant: small-caps;
    color: var(--light-brown);
  }

  h3 {
    font-family: sans-serif;
  }

  .titles {
    margin: 18px 0px;
  }

  .texts {
    margin-bottom: 18px;
  }

  .ciphertitle {
    font-family: monospace;
    font-size: 24px;
    margin: 0px;
  }

  .decryptedtitle {
    font-family: monospace;
    font-size: 24px;
    color: var(--light-brown);
    margin: 0px;
  }

  .button {
    background-color: var(--text-grey);
    border: 2px solid var(--text-grey);
    border-radius: 15px;
    font-variant: small-caps;
    font-size: 18px;
    text-align: center;
    padding: 8px 25px;
    color: var(--beige-ish);
    margin-top: 15px;
    cursor: pointer;
    transition-duration: 0.2s;
  }

  .button:hover {
    background-color: var(--nina);
    color: var(--text-grey);
  }

  .header_buttons_container {
    display: flex;
  }

  .header_button {
    background-color: var(--beige-ish);
    border: 2px solid var(--beige-ish);
    border-radius: 15px;
    font-variant: small-caps;
    font-size: 18px;
    text-align: center;
    padding: 6px 15px;
    color: var(--text-grey);
    margin-top: 20px;
    cursor: pointer;
    transition-duration: 0.2s;
    margin: 0px 10px;
  }

  .header_button:hover {
    background-color: var(--light-brown);
    border: 2px solid var(--light-brown);
  }

  input[type="text"] {
    width: 100%;
    padding: 8px 20px;
    margin: 8px 0;
    box-sizing: border-box;
  }

  input[type="text"]:focus {
    border: 2px solid var(--light-brown);
  }

  input:required:invalid {
    /*evite la bordure rouge moche par défaut du navigateur*/
    outline: none;
  }

  .flex {
    display: flex;
    align-items: center;
    flex-direction: column;
    width: 85%;
    margin: auto;
  }

  .content {
    display: flex;
    justify-content: space-between;
    width: 100%;
  }

  .header {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
  }

  .texts_container {
    max-width: 800px;
  }

  .texts {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
  }

  .word {
    display: flex;
    flex-direction: row;
  }

  .letter {
    display: flex;
    font-family: monospace;
    font-size: 20px;
    flex-direction: column;
    flex-basis: 10px;
    flex-grow: 0;
    flex-shrink: 0;
  }

  .texts_letter_cipher {
    margin: 0;
  }

  .texts_letter_decrypted {
    padding-bottom: 10px;
    color: var(--light-brown);
  }

  .replace_what {
    background: var(--nina);
    border-radius: 25px;
    padding: 15px;
    font-family: sans-serif;
    font-size: 18px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .replace_what_item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: 0px 30px;
  }

  .replace_what_texts {
    display: flex;
    flex-direction: row;
    padding: 5px;
    justify-content: center;
  }

  .replace_what_buttons {
    padding: 5px;
    margin: auto;
    justify-content: space-evenly;
  }

  .tables_container {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding: 0px 30px;
  }

  .tables {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    gap: 50px;
    flex-grow: 1;
  }

  .one_table {
    display: flex;
    flex-direction: column;
  }

  td,th {
    border: 1px solid var(--light-brown);
    padding: 5px;
    font-family: monospace;
    font-size: 20px;
    transition: 500ms;
  }

  .decrypted_letter {
    background-color: var(--beige-ish);
  }

  th {
    background: var(--light-brown);
    border: 1px solid var(--text-grey);
  }

  table {
    border-collapse: collapse;
  }
</style>