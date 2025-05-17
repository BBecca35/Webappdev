// Importáljuk a betűképeket
import A from '../assets/letters/A.png';
import B from '../assets/letters/B.png';
import C from '../assets/letters/C.png';
import D from '../assets/letters/D.png';
import E from '../assets/letters/E.png';
import F from '../assets/letters/F.png';
import G from '../assets/letters/G.png';
import H from '../assets/letters/H.png';
import I from '../assets/letters/I.png';
import J from '../assets/letters/J.png';
import K from '../assets/letters/K.png';
import L from '../assets/letters/L.png';
import M from '../assets/letters/M.png';
import N from '../assets/letters/N.png';
import O from '../assets/letters/O.png';
import P from '../assets/letters/P.png';
import Q from '../assets/letters/Q.png';
import R from '../assets/letters/R.png';
import S from '../assets/letters/S.png';
import T from '../assets/letters/T.png';
import U from '../assets/letters/U.png';
import V from '../assets/letters/V.png';
import W from '../assets/letters/W.png';
import X from '../assets/letters/X.png';
import Y from '../assets/letters/Y.png';
import Z from '../assets/letters/Z.png';


// Egy objektumba szervezzük őket
const letterAssets = {
  A, B, C, D, E, F, G, H, I, J, K, L, M,
  N, O, P, Q, R, S, T, U, V, W, X, Y, Z
};

// Ékezetes betűk kezelése
export function normalizeLetter(letter) {
  const accentedMap = {
    Á: 'A', É: 'E', Í: 'I', Ó: 'O', Ö: 'O', Ő: 'O', Ú: 'U', Ü: 'U', Ű: 'U',
    á: 'A', é: 'E', í: 'I', ó: 'O', ö: 'O', ő: 'O', ú: 'U', ü: 'U', ű: 'U',
  };
  return accentedMap[letter] || letter;
}

// A képet visszaadó függvény
export function getLettersAsset(playlistName) {
  const fallback = U;

  if (!playlistName || typeof playlistName !== 'string') {
    return fallback;
  }

  const firstLetter = normalizeLetter(playlistName.charAt(0).toUpperCase());
  return letterAssets[firstLetter] || fallback;
}
