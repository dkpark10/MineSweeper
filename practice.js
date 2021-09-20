function check(mid, gems, gemnum, gemcnt) {


  for (let i = mid - 1; i < gems.length; i++) {
    let cnt = 0;
    const visited = Array(gemcnt + 1).fill(false);

    const sel = gems.slice(i - mid + 1, i + 1);
    for (let j = 0; j < sel.length; j++) {
      if (visited[gemnum[sel[j]]] === false) {
        visited[gemnum[sel[j]]] = true;
        cnt++;
      }

      if (cnt === gemcnt) return [i - mid + 1, false];
    }
  }
  return [-1, true];
}

function solution(gems) {

  let gemcnt = 0;
  const gemnum = gems.reduce((acc, cur, idx) => {
    acc[cur] = acc[cur] || 0;
    if (acc[cur] === 0) {
      acc[cur] = Object.keys(acc).length;
      gemcnt++;
    }
    return acc;
  }, {});

  let left = 1, right = gems.length;
  let mid, ret, ans = [];
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    ret = check(mid,gems,gemnum,gemcnt);
    if (ret[1] === true) {
      left = mid + 1;
    } else {
      right = mid - 1;
      ans = [ret[0] + 1, ret[0] + mid];
    }
  }

  return ans;
}

const nomi1 = ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"];
const nomi2 = ["AA", "AB", "AC", "AA", "AC"];
const nomi3 = ["XYZ", "XYZ", "XYZ"]	;
const nomi4 = ["ZZZ", "YYY", "NNNN", "YYY", "BBB"];

const nomi = [
  ["DIA", "RUBY", "RUBY", "DIA", "DIA", "EMERALD", "SAPPHIRE", "DIA"],
  ["AA", "AB", "AC", "AA", "AC"],
  ["XYZ", "XYZ", "XYZ"]	,
  ["ZZZ", "YYY", "NNNN", "YYY", "BBB"]
];

console.log(solution(nomi[0]));
console.log(solution(nomi[1]));
console.log(solution(nomi[2]));
console.log(solution(nomi[3]));