import { createMemo, createSignal, Signal, type Component } from 'solid-js';

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

function isAlphaChar(ch: string) {
  return ch.length === 1 && /[A-Za-z]/.test(ch);
}

function valuesSet(obj: {[key: string]: string}): Set<string> {
  const res: Set<string> = new Set();
  for (const v of Object.values(obj)) {
    res.add(v);
  }
  return res;
}

function decryptLetter(letter: string, substitution: {[key: string]: string}) {
  return substitution[letter] ||
          substitution[letter.toUpperCase()]?.toLowerCase() ||
          (isAlphaChar(letter) ? "-" : letter);
}

function decryptText(cipher: string, substitution: {[key: string]: string}) {
  let decrypted = "";
  for (let i = 0; i < cipher.length; i++) {
    decrypted += decryptLetter(cipher[i], substitution);
  }
  return decrypted;
}

const App: Component = () => {
  // signals
  const [substitution, setSubstitution]: Signal<{[key: string]: string}> = createSignal({});
  const [replaceFrom, setReplaceFrom] = createSignal("");
  const [replaceTo, setReplaceTo] = createSignal("");
  
  // derived
  const decryptedTitle = () => decryptText(cipherTitle, substitution());
  const substitutionValues = createMemo(() => valuesSet(substitution()));

  // callbacks
  const reset = () => {
    setSubstitution({});
    setReplaceFrom("");
    setReplaceTo("");
  }

  const solution = () => setSubstitution({
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
    Y: "X",
  });

  const replace = () => {
    const oldLetter = replaceFrom().toUpperCase();
    const newLetter = replaceTo().toUpperCase();
    if (!isAlphaChar(oldLetter)) {
      return;
    }
    if (isAlphaChar(newLetter)) {
      setSubstitution({...substitution(), [oldLetter]: newLetter});
    } else {
      let subs = {...substitution()}; 
      delete subs[oldLetter];
      setSubstitution(subs);
    }
  }

  // views
  const Texts = () => (
    <div id="texts_container">
      <div id="titles">
        <h3 class="ciphertitle">{cipherTitle}</h3>
        <h3 class="decryptedtitle">{decryptedTitle()}</h3>
      </div>
      <div id="texts">
        {cipherText.split(" ").map(word => (
          <div class="word">
            {Array.from(word).map(letter => (
              <div class="letter">
                <div class="texts_letter_cipher">{letter}</div>
                <div class="texts_letter_decrypted">{decryptLetter(letter, substitution())}</div>
              </div>
            ))}
            &nbsp;&nbsp;
          </div>
        ))}
      </div>
      <div id="replace_what">
        <div id="replace_what_texts">
          <div class="replace_what_item">
            <label>Lettre à remplacer :</label>
            <input
              type="text"
              maxlength="1"
              value={replaceFrom()}
              onChange={e => setReplaceFrom(e.currentTarget.value)}
              required
            />
          </div>
          <div class="replace_what_item">
            <label>Remplacer par :</label>
            <input
              type="text"
              maxlength="1"
              value={replaceTo()}
              onChange={e => setReplaceTo(e.currentTarget.value)}
              required
            />
          </div>
        </div>
        <div id="replace_what_buttons">
          <input class="button" value="Remplacer" onClick={replace} />
        </div>
      </div>
    </div>
  )

  const Tables = () => (
    <div id="tables_container">
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
              {cipherFrequency.map(([letter, freq]) => (
                <tr>
                  <td classList={{decrypted_letter: !!substitution()[letter]}}>{letter}</td>
                  <td classList={{decrypted_letter: !!substitution()[letter]}}>{freq}</td>
                </tr>
              ))}
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
              {frenchFrequency.map(([letter, freq]) => (
                <tr>
                  <td classList={{decrypted_letter: substitutionValues().has(letter)}}>{letter}</td>
                  <td classList={{decrypted_letter: substitutionValues().has(letter)}}>{freq}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  return (
    <div id="flex">
      <div id="header">
        <h1>(Dé)chiffrement par substitution</h1>
        <div id="header_buttons_container">
          <button class="header_button" onClick={reset}>&#8635;</button>
          <button class="header_button" onClick={solution}>&#9998;</button>
        </div>
      </div>
      <div id="content">
        <Texts/>
        <Tables/>
      </div>
    </div>
  )
}

export default App;
