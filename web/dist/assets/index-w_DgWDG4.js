(function () {
  const t = document.createElement("link").relList;
  if (t && t.supports && t.supports("modulepreload")) return;
  for (const i of document.querySelectorAll('link[rel="modulepreload"]')) s(i);
  new MutationObserver((i) => {
    for (const r of i)
      if (r.type === "childList")
        for (const l of r.addedNodes)
          l.tagName === "LINK" && l.rel === "modulepreload" && s(l);
  }).observe(document, {
    childList: !0,
    subtree: !0,
  });

  function n(i) {
    const r = {};
    return (
      i.integrity && (r.integrity = i.integrity),
      i.referrerPolicy && (r.referrerPolicy = i.referrerPolicy),
      i.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : i.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }

  function s(i) {
    if (i.ep) return;
    i.ep = !0;
    const r = n(i);
    fetch(i.href, r);
  }
})();
const Fe = (e, t) => e === t,
  k = Symbol("solid-proxy"),
  ce = Symbol("solid-track"),
  Y = {
    equals: Fe,
  };
let Te = Ce;
const I = 1,
  Z = 2,
  $e = {
    owned: null,
    cleanups: null,
    context: null,
    owner: null,
  };
var g = null;
let ae = null,
  Ge = null,
  m = null,
  S = null,
  O = null,
  re = 0;

function Q(e, t) {
  const n = m,
    s = g,
    i = e.length === 0,
    r = t === void 0 ? s : t,
    l = i
      ? $e
      : {
          owned: null,
          cleanups: null,
          context: r ? r.context : null,
          owner: r,
        },
    o = i ? e : () => e(() => b(() => le(l)));
  (g = l), (m = null);
  try {
    return D(o, !0);
  } finally {
    (m = n), (g = s);
  }
}

function X(e, t) {
  t = t ? Object.assign({}, Y, t) : Y;
  const n = {
      value: e,
      observers: null,
      observerSlots: null,
      comparator: t.equals || void 0,
    },
    s = (i) => (typeof i == "function" && (i = i(n.value)), _e(n, i));
  return [Ee.bind(n), s];
}

function Ue(e, t, n) {
  const s = oe(e, t, !0, I);
  G(s);
}

function W(e, t, n) {
  const s = oe(e, t, !1, I);
  G(s);
}

function ue(e, t, n) {
  Te = et;
  const s = oe(e, t, !1, I);
  (!n || !n.render) && (s.user = !0), O ? O.push(s) : G(s);
}

function P(e, t, n) {
  n = n ? Object.assign({}, Y, n) : Y;
  const s = oe(e, t, !0, 0);
  return (
    (s.observers = null),
    (s.observerSlots = null),
    (s.comparator = n.equals || void 0),
    G(s),
    Ee.bind(s)
  );
}

function fe(e) {
  return D(e, !1);
}

function b(e) {
  if (m === null) return e();
  const t = m;
  m = null;
  try {
    return e();
  } finally {
    m = t;
  }
}

function qe(e) {
  return (
    g === null ||
      (g.cleanups === null ? (g.cleanups = [e]) : g.cleanups.push(e)),
    e
  );
}

function de() {
  return m;
}

function Ke(e) {
  const t = m,
    n = g;
  return Promise.resolve().then(() => {
    (m = t), (g = n);
    let s;
    return D(e, !1), (m = g = null), s ? s.done : void 0;
  });
}
const [Ve, Ut] = X(!1);

function Xe() {
  return [Ve, Ke];
}

function Je(e, t) {
  const n = Symbol("context");
  return {
    id: n,
    Provider: nt(n),
    defaultValue: e,
  };
}

function Qe(e) {
  return g && g.context && g.context[e.id] !== void 0
    ? g.context[e.id]
    : e.defaultValue;
}

function Ye(e) {
  const t = P(e),
    n = P(() => he(t()));
  return (
    (n.toArray = () => {
      const s = n();
      return Array.isArray(s) ? s : s != null ? [s] : [];
    }),
    n
  );
}

function Ee() {
  if (this.sources && this.state)
    if (this.state === I) G(this);
    else {
      const e = S;
      (S = null), D(() => ee(this), !1), (S = e);
    }
  if (m) {
    const e = this.observers ? this.observers.length : 0;
    m.sources
      ? (m.sources.push(this), m.sourceSlots.push(e))
      : ((m.sources = [this]), (m.sourceSlots = [e])),
      this.observers
        ? (this.observers.push(m),
          this.observerSlots.push(m.sources.length - 1))
        : ((this.observers = [m]),
          (this.observerSlots = [m.sources.length - 1]));
  }
  return this.value;
}

function _e(e, t, n) {
  let s = e.value;
  return (
    (!e.comparator || !e.comparator(s, t)) &&
      ((e.value = t),
      e.observers &&
        e.observers.length &&
        D(() => {
          for (let i = 0; i < e.observers.length; i += 1) {
            const r = e.observers[i],
              l = ae && ae.running;
            l && ae.disposed.has(r),
              (l ? !r.tState : !r.state) &&
                (r.pure ? S.push(r) : O.push(r), r.observers && Oe(r)),
              l || (r.state = I);
          }
          if (S.length > 1e6) throw ((S = []), new Error());
        }, !1)),
    t
  );
}

function G(e) {
  if (!e.fn) return;
  le(e);
  const t = re;
  Ze(e, e.value, t);
}

function Ze(e, t, n) {
  let s;
  const i = g,
    r = m;
  m = g = e;
  try {
    s = e.fn(t);
  } catch (l) {
    return (
      e.pure &&
        ((e.state = I), e.owned && e.owned.forEach(le), (e.owned = null)),
      (e.updatedAt = n + 1),
      Ie(l)
    );
  } finally {
    (m = r), (g = i);
  }
  (!e.updatedAt || e.updatedAt <= n) &&
    (e.updatedAt != null && "observers" in e ? _e(e, s) : (e.value = s),
    (e.updatedAt = n));
}

function oe(e, t, n, s = I, i) {
  const r = {
    fn: e,
    state: s,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: t,
    owner: g,
    context: g ? g.context : null,
    pure: n,
  };
  return (
    g === null || (g !== $e && (g.owned ? g.owned.push(r) : (g.owned = [r]))), r
  );
}

function z(e) {
  if (e.state === 0) return;
  if (e.state === Z) return ee(e);
  if (e.suspense && b(e.suspense.inFallback)) return e.suspense.effects.push(e);
  const t = [e];
  for (; (e = e.owner) && (!e.updatedAt || e.updatedAt < re); )
    e.state && t.push(e);
  for (let n = t.length - 1; n >= 0; n--)
    if (((e = t[n]), e.state === I)) G(e);
    else if (e.state === Z) {
      const s = S;
      (S = null), D(() => ee(e, t[0]), !1), (S = s);
    }
}

function D(e, t) {
  if (S) return e();
  let n = !1;
  t || (S = []), O ? (n = !0) : (O = []), re++;
  try {
    const s = e();
    return ze(n), s;
  } catch (s) {
    n || (O = null), (S = null), Ie(s);
  }
}

function ze(e) {
  if ((S && (Ce(S), (S = null)), e)) return;
  const t = O;
  (O = null), t.length && D(() => Te(t), !1);
}

function Ce(e) {
  for (let t = 0; t < e.length; t++) z(e[t]);
}

function et(e) {
  let t,
    n = 0;
  for (t = 0; t < e.length; t++) {
    const s = e[t];
    s.user ? (e[n++] = s) : z(s);
  }
  for (t = 0; t < n; t++) z(e[t]);
}

function ee(e, t) {
  e.state = 0;
  for (let n = 0; n < e.sources.length; n += 1) {
    const s = e.sources[n];
    if (s.sources) {
      const i = s.state;
      i === I
        ? s !== t && (!s.updatedAt || s.updatedAt < re) && z(s)
        : i === Z && ee(s, t);
    }
  }
}

function Oe(e) {
  for (let t = 0; t < e.observers.length; t += 1) {
    const n = e.observers[t];
    n.state ||
      ((n.state = Z), n.pure ? S.push(n) : O.push(n), n.observers && Oe(n));
  }
}

function le(e) {
  let t;
  if (e.sources)
    for (; e.sources.length; ) {
      const n = e.sources.pop(),
        s = e.sourceSlots.pop(),
        i = n.observers;
      if (i && i.length) {
        const r = i.pop(),
          l = n.observerSlots.pop();
        s < i.length &&
          ((r.sourceSlots[l] = s), (i[s] = r), (n.observerSlots[s] = l));
      }
    }
  if (e.owned) {
    for (t = e.owned.length - 1; t >= 0; t--) le(e.owned[t]);
    e.owned = null;
  }
  if (e.cleanups) {
    for (t = e.cleanups.length - 1; t >= 0; t--) e.cleanups[t]();
    e.cleanups = null;
  }
  e.state = 0;
}

function tt(e) {
  return e instanceof Error
    ? e
    : new Error(typeof e == "string" ? e : "Unknown error", {
        cause: e,
      });
}

function Ie(e, t = g) {
  throw tt(e);
}

function he(e) {
  if (typeof e == "function" && !e.length) return he(e());
  if (Array.isArray(e)) {
    const t = [];
    for (let n = 0; n < e.length; n++) {
      const s = he(e[n]);
      Array.isArray(s) ? t.push.apply(t, s) : t.push(s);
    }
    return t;
  }
  return e;
}

function nt(e, t) {
  return function (s) {
    let i;
    return (
      W(
        () =>
          (i = b(
            () => (
              (g.context = {
                ...g.context,
                [e]: s.value,
              }),
              Ye(() => s.children)
            )
          )),
        void 0
      ),
      i
    );
  };
}
const st = Symbol("fallback");

function ye(e) {
  for (let t = 0; t < e.length; t++) e[t]();
}

function it(e, t, n = {}) {
  let s = [],
    i = [],
    r = [],
    l = 0,
    o = t.length > 1 ? [] : null;
  return (
    qe(() => ye(r)),
    () => {
      let c = e() || [],
        u,
        a;
      return (
        c[ce],
        b(() => {
          let f = c.length,
            y,
            h,
            p,
            N,
            H,
            T,
            $,
            _,
            j;
          if (f === 0)
            l !== 0 &&
              (ye(r), (r = []), (s = []), (i = []), (l = 0), o && (o = [])),
              n.fallback &&
                ((s = [st]),
                (i[0] = Q((Be) => ((r[0] = Be), n.fallback()))),
                (l = 1));
          else if (l === 0) {
            for (i = new Array(f), a = 0; a < f; a++)
              (s[a] = c[a]), (i[a] = Q(d));
            l = f;
          } else {
            for (
              p = new Array(f),
                N = new Array(f),
                o && (H = new Array(f)),
                T = 0,
                $ = Math.min(l, f);
              T < $ && s[T] === c[T];
              T++
            );
            for (
              $ = l - 1, _ = f - 1;
              $ >= T && _ >= T && s[$] === c[_];
              $--, _--
            )
              (p[_] = i[$]), (N[_] = r[$]), o && (H[_] = o[$]);
            for (y = new Map(), h = new Array(_ + 1), a = _; a >= T; a--)
              (j = c[a]),
                (u = y.get(j)),
                (h[a] = u === void 0 ? -1 : u),
                y.set(j, a);
            for (u = T; u <= $; u++)
              (j = s[u]),
                (a = y.get(j)),
                a !== void 0 && a !== -1
                  ? ((p[a] = i[u]),
                    (N[a] = r[u]),
                    o && (H[a] = o[u]),
                    (a = h[a]),
                    y.set(j, a))
                  : r[u]();
            for (a = T; a < f; a++)
              a in p
                ? ((i[a] = p[a]), (r[a] = N[a]), o && ((o[a] = H[a]), o[a](a)))
                : (i[a] = Q(d));
            (i = i.slice(0, (l = f))), (s = c.slice(0));
          }
          return i;
        })
      );

      function d(f) {
        if (((r[a] = f), o)) {
          const [y, h] = X(a);
          return (o[a] = h), t(c[a], y);
        }
        return t(c[a]);
      }
    }
  );
}

function w(e, t) {
  return b(() => e(t || {}));
}
const rt = (e) => `Stale read from <${e}>.`;

function q(e) {
  const t = "fallback" in e && {
    fallback: () => e.fallback,
  };
  return P(it(() => e.each, e.children, t || void 0));
}

function F(e) {
  const t = e.keyed,
    n = P(() => e.when, void 0, {
      equals: (s, i) => (t ? s === i : !s == !i),
    });
  return P(
    () => {
      const s = n();
      if (s) {
        const i = e.children;
        return typeof i == "function" && i.length > 0
          ? b(() =>
              i(
                t
                  ? s
                  : () => {
                      if (!b(n)) throw rt("Show");
                      return e.when;
                    }
              )
            )
          : i;
      }
      return e.fallback;
    },
    void 0,
    void 0
  );
}

function ot(e, t, n) {
  let s = n.length,
    i = t.length,
    r = s,
    l = 0,
    o = 0,
    c = t[i - 1].nextSibling,
    u = null;
  for (; l < i || o < r; ) {
    if (t[l] === n[o]) {
      l++, o++;
      continue;
    }
    for (; t[i - 1] === n[r - 1]; ) i--, r--;
    if (i === l) {
      const a = r < s ? (o ? n[o - 1].nextSibling : n[r - o]) : c;
      for (; o < r; ) e.insertBefore(n[o++], a);
    } else if (r === o)
      for (; l < i; ) (!u || !u.has(t[l])) && t[l].remove(), l++;
    else if (t[l] === n[r - 1] && n[o] === t[i - 1]) {
      const a = t[--i].nextSibling;
      e.insertBefore(n[o++], t[l++].nextSibling),
        e.insertBefore(n[--r], a),
        (t[i] = n[r]);
    } else {
      if (!u) {
        u = new Map();
        let d = o;
        for (; d < r; ) u.set(n[d], d++);
      }
      const a = u.get(t[l]);
      if (a != null)
        if (o < a && a < r) {
          let d = l,
            f = 1,
            y;
          for (
            ;
            ++d < i && d < r && !((y = u.get(t[d])) == null || y !== a + f);

          )
            f++;
          if (f > a - o) {
            const h = t[l];
            for (; o < a; ) e.insertBefore(n[o++], h);
          } else e.replaceChild(n[o++], t[l++]);
        } else l++;
      else t[l++].remove();
    }
  }
}
const ve = "_$DX_DELEGATE";

function lt(e, t, n, s = {}) {
  let i;
  return (
    Q((r) => {
      (i = r),
        t === document ? e() : v(t, e(), t.firstChild ? null : void 0, n);
    }, s.owner),
    () => {
      i(), (t.textContent = "");
    }
  );
}

function x(e, t, n) {
  let s;
  const i = () => {
      const l = document.createElement("template");
      return (
        (l.innerHTML = e),
        n ? l.content.firstChild.firstChild : l.content.firstChild
      );
    },
    r = t
      ? () => b(() => document.importNode(s || (s = i()), !0))
      : () => (s || (s = i())).cloneNode(!0);
  return (r.cloneNode = r), r;
}

function at(e, t = window.document) {
  const n = t[ve] || (t[ve] = new Set());
  for (let s = 0, i = e.length; s < i; s++) {
    const r = e[s];
    n.has(r) || (n.add(r), t.addEventListener(r, ut));
  }
}

function Ne(e, t, n) {
  n == null ? e.removeAttribute(t) : e.setAttribute(t, n);
}

function ct(e, t) {
  t == null ? e.removeAttribute("class") : (e.className = t);
}

function Le(e, t, n) {
  return b(() => e(t, n));
}

function v(e, t, n, s) {
  if ((n !== void 0 && !s && (s = []), typeof t != "function"))
    return te(e, t, s, n);
  W((i) => te(e, t(), i, n), s);
}

function ut(e) {
  const t = `$$${e.type}`;
  let n = (e.composedPath && e.composedPath()[0]) || e.target;
  for (
    e.target !== n &&
      Object.defineProperty(e, "target", {
        configurable: !0,
        value: n,
      }),
      Object.defineProperty(e, "currentTarget", {
        configurable: !0,
        get() {
          return n || document;
        },
      });
    n;

  ) {
    const s = n[t];
    if (s && !n.disabled) {
      const i = n[`${t}Data`];
      if ((i !== void 0 ? s.call(n, i, e) : s.call(n, e), e.cancelBubble))
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}

function te(e, t, n, s, i) {
  for (; typeof n == "function"; ) n = n();
  if (t === n) return n;
  const r = typeof t,
    l = s !== void 0;
  if (
    ((e = (l && n[0] && n[0].parentNode) || e),
    r === "string" || r === "number")
  )
    if ((r === "number" && (t = t.toString()), l)) {
      let o = n[0];
      o && o.nodeType === 3
        ? o.data !== t && (o.data = t)
        : (o = document.createTextNode(t)),
        (n = R(e, n, s, o));
    } else
      n !== "" && typeof n == "string"
        ? (n = e.firstChild.data = t)
        : (n = e.textContent = t);
  else if (t == null || r === "boolean") n = R(e, n, s);
  else {
    if (r === "function")
      return (
        W(() => {
          let o = t();
          for (; typeof o == "function"; ) o = o();
          n = te(e, o, n, s);
        }),
        () => n
      );
    if (Array.isArray(t)) {
      const o = [],
        c = n && Array.isArray(n);
      if (ge(o, t, n, i)) return W(() => (n = te(e, o, n, s, !0))), () => n;
      if (o.length === 0) {
        if (((n = R(e, n, s)), l)) return n;
      } else
        c
          ? n.length === 0
            ? Se(e, o, s)
            : ot(e, n, o)
          : (n && R(e), Se(e, o));
      n = o;
    } else if (t.nodeType) {
      if (Array.isArray(n)) {
        if (l) return (n = R(e, n, s, t));
        R(e, n, null, t);
      } else
        n == null || n === "" || !e.firstChild
          ? e.appendChild(t)
          : e.replaceChild(t, e.firstChild);
      n = t;
    }
  }
  return n;
}

function ge(e, t, n, s) {
  let i = !1;
  for (let r = 0, l = t.length; r < l; r++) {
    let o = t[r],
      c = n && n[r],
      u;
    if (!(o == null || o === !0 || o === !1))
      if ((u = typeof o) == "object" && o.nodeType) e.push(o);
      else if (Array.isArray(o)) i = ge(e, o, c) || i;
      else if (u === "function")
        if (s) {
          for (; typeof o == "function"; ) o = o();
          i =
            ge(e, Array.isArray(o) ? o : [o], Array.isArray(c) ? c : [c]) || i;
        } else e.push(o), (i = !0);
      else {
        const a = String(o);
        c && c.nodeType === 3 && c.data === a
          ? e.push(c)
          : e.push(document.createTextNode(a));
      }
  }
  return i;
}

function Se(e, t, n = null) {
  for (let s = 0, i = t.length; s < i; s++) e.insertBefore(t[s], n);
}

function R(e, t, n, s) {
  if (n === void 0) return (e.textContent = "");
  const i = s || document.createTextNode("");
  if (t.length) {
    let r = !1;
    for (let l = t.length - 1; l >= 0; l--) {
      const o = t[l];
      if (i !== o) {
        const c = o.parentNode === e;
        !r && !l
          ? c
            ? e.replaceChild(i, o)
            : e.insertBefore(i, n)
          : c && o.remove();
      } else r = !0;
    }
  } else e.insertBefore(i, n);
  return [i];
}
const me = Symbol("store-raw"),
  B = Symbol("store-node"),
  C = Symbol("store-has"),
  Me = Symbol("store-self");

function Pe(e) {
  let t = e[k];
  if (
    !t &&
    (Object.defineProperty(e, k, {
      value: (t = new Proxy(e, ht)),
    }),
    !Array.isArray(e))
  ) {
    const n = Object.keys(e),
      s = Object.getOwnPropertyDescriptors(e);
    for (let i = 0, r = n.length; i < r; i++) {
      const l = n[i];
      s[l].get &&
        Object.defineProperty(e, l, {
          enumerable: s[l].enumerable,
          get: s[l].get.bind(t),
        });
    }
  }
  return t;
}

function ne(e) {
  let t;
  return (
    e != null &&
    typeof e == "object" &&
    (e[k] ||
      !(t = Object.getPrototypeOf(e)) ||
      t === Object.prototype ||
      Array.isArray(e))
  );
}

function K(e, t = new Set()) {
  let n, s, i, r;
  if ((n = e != null && e[me])) return n;
  if (!ne(e) || t.has(e)) return e;
  if (Array.isArray(e)) {
    Object.isFrozen(e) ? (e = e.slice(0)) : t.add(e);
    for (let l = 0, o = e.length; l < o; l++)
      (i = e[l]), (s = K(i, t)) !== i && (e[l] = s);
  } else {
    Object.isFrozen(e) ? (e = Object.assign({}, e)) : t.add(e);
    const l = Object.keys(e),
      o = Object.getOwnPropertyDescriptors(e);
    for (let c = 0, u = l.length; c < u; c++)
      (r = l[c]), !o[r].get && ((i = e[r]), (s = K(i, t)) !== i && (e[r] = s));
  }
  return e;
}

function se(e, t) {
  let n = e[t];
  return (
    n ||
      Object.defineProperty(e, t, {
        value: (n = Object.create(null)),
      }),
    n
  );
}

function V(e, t, n) {
  if (e[t]) return e[t];
  const [s, i] = X(n, {
    equals: !1,
    internal: !0,
  });
  return (s.$ = i), (e[t] = s);
}

function ft(e, t) {
  const n = Reflect.getOwnPropertyDescriptor(e, t);
  return (
    !n ||
      n.get ||
      !n.configurable ||
      t === k ||
      t === B ||
      (delete n.value, delete n.writable, (n.get = () => e[k][t])),
    n
  );
}

function ke(e) {
  de() && V(se(e, B), Me)();
}

function dt(e) {
  return ke(e), Reflect.ownKeys(e);
}
const ht = {
  get(e, t, n) {
    if (t === me) return e;
    if (t === k) return n;
    if (t === ce) return ke(e), n;
    const s = se(e, B),
      i = s[t];
    let r = i ? i() : e[t];
    if (t === B || t === C || t === "__proto__") return r;
    if (!i) {
      const l = Object.getOwnPropertyDescriptor(e, t);
      de() &&
        (typeof r != "function" || e.hasOwnProperty(t)) &&
        !(l && l.get) &&
        (r = V(s, t, r)());
    }
    return ne(r) ? Pe(r) : r;
  },
  has(e, t) {
    return t === me ||
      t === k ||
      t === ce ||
      t === B ||
      t === C ||
      t === "__proto__"
      ? !0
      : (de() && V(se(e, C), t)(), t in e);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: dt,
  getOwnPropertyDescriptor: ft,
};

function ie(e, t, n, s = !1) {
  if (!s && e[t] === n) return;
  const i = e[t],
    r = e.length;
  n === void 0
    ? (delete e[t], e[C] && e[C][t] && i !== void 0 && e[C][t].$())
    : ((e[t] = n), e[C] && e[C][t] && i === void 0 && e[C][t].$());
  let l = se(e, B),
    o;
  if (((o = V(l, t, i)) && o.$(() => n), Array.isArray(e) && e.length !== r)) {
    for (let c = e.length; c < r; c++) (o = l[c]) && o.$();
    (o = V(l, "length", r)) && o.$(e.length);
  }
  (o = l[Me]) && o.$();
}

function We(e, t) {
  const n = Object.keys(t);
  for (let s = 0; s < n.length; s += 1) {
    const i = n[s];
    ie(e, i, t[i]);
  }
}

function gt(e, t) {
  if ((typeof t == "function" && (t = t(e)), (t = K(t)), Array.isArray(t))) {
    if (e === t) return;
    let n = 0,
      s = t.length;
    for (; n < s; n++) {
      const i = t[n];
      e[n] !== i && ie(e, n, i);
    }
    ie(e, "length", s);
  } else We(e, t);
}

function U(e, t, n = []) {
  let s,
    i = e;
  if (t.length > 1) {
    s = t.shift();
    const l = typeof s,
      o = Array.isArray(e);
    if (Array.isArray(s)) {
      for (let c = 0; c < s.length; c++) U(e, [s[c]].concat(t), n);
      return;
    } else if (o && l === "function") {
      for (let c = 0; c < e.length; c++) s(e[c], c) && U(e, [c].concat(t), n);
      return;
    } else if (o && l === "object") {
      const { from: c = 0, to: u = e.length - 1, by: a = 1 } = s;
      for (let d = c; d <= u; d += a) U(e, [d].concat(t), n);
      return;
    } else if (t.length > 1) {
      U(e[s], t, [s].concat(n));
      return;
    }
    (i = e[s]), (n = [s].concat(n));
  }
  let r = t[0];
  (typeof r == "function" && ((r = r(i, n)), r === i)) ||
    (s === void 0 && r == null) ||
    ((r = K(r)),
    s === void 0 || (ne(i) && ne(r) && !Array.isArray(r))
      ? We(i, r)
      : ie(e, s, r));
}

function mt(...[e, t]) {
  const n = K(e || {}),
    s = Array.isArray(n),
    i = Pe(n);

  function r(...l) {
    fe(() => {
      s && l.length === 1 ? gt(n, l[0]) : U(n, l);
    });
  }
  return [i, r];
}
const De = Je({}),
  He = {
    name: "feed",
    displayName: "Feed",
    color: "#e0e0e0",
    hidden: !1,
    isGlobal: !1,
    isChannel: !0,
  };
var A = (function (e) {
  return (
    (e[(e.ShowWhenActive = 0)] = "ShowWhenActive"),
    (e[(e.AlwaysShow = 1)] = "AlwaysShow"),
    (e[(e.AlwaysHide = 2)] = "AlwaysHide"),
    e
  );
})(A || {});

function wt(e) {
  const [t, n] = mt({
      showInput: !1,
      showWindow: !1,
      showHideState: !1,
      hideState: A.ShowWhenActive,
      backingSuggestions: [],
      removedSuggestions: [],
      message: "",
      messages: [],
      oldMessages: [],
      oldMessagesIndex: -1,
      tplBackups: [],
      msgTplBackups: [],
      focusTimer: 0,
      showWindowTimer: 0,
      showHideStateTimer: 0,
      listener: (r) => {},
      modes: [He],
      modeIdx: 0,
    }),
    [s, i] = X("");
  return w(De.Provider, {
    value: {
      data: t,
      setData: n,
      transform: s,
      setTransform: i,
    },
    get children() {
      return e.children;
    },
  });
}

function J() {
  return Qe(De);
}
const L = (e, t) => {
  const n = {};
  ue(() => {
    n.current = t;
  }, [t]),
    ue(() => {
      const s = (i) => {
        const { action: r, data: l } = i.data;
        n.current && r === e && n.current(l);
      };
      return (
        window.addEventListener("message", s),
        () => window.removeEventListener("message", s)
      );
    }, [e]);
};
var pt = () => {},
  Ae = (e, t) => t();

function yt(e, t) {
  const n = b(e),
    s = n ? [n] : [],
    { onEnter: i = Ae, onExit: r = Ae } = t,
    [l, o] = X(t.appear ? [] : s),
    [c] = Xe();
  let u,
    a = !1;

  function d(h, p) {
    if (!h) return p && p();
    (a = !0),
      r(h, () => {
        fe(() => {
          (a = !1), o((N) => N.filter((H) => H !== h)), p && p();
        });
      });
  }

  function f(h) {
    const p = u;
    if (!p) return h && h();
    (u = void 0), o((N) => [p, ...N]), i(p, h ?? pt);
  }
  const y =
    t.mode === "out-in"
      ? (h) => a || d(h, f)
      : t.mode === "in-out"
      ? (h) => f(() => d(h))
      : (h) => {
          d(h), f();
        };
  return (
    Ue(
      (h) => {
        const p = e();
        return b(c)
          ? (c(), h)
          : (p !== h && ((u = p), fe(() => b(() => y(h)))), p);
      },
      t.appear ? void 0 : n
    ),
    l
  );
}
var be = (e) => e instanceof Element;

function we(e, t) {
  if (t(e)) return e;
  if (typeof e == "function" && !e.length) return we(e(), t);
  if (Array.isArray(e))
    for (const n of e) {
      const s = we(n, t);
      if (s) return s;
    }
  return null;
}

function vt(e, t = be, n = be) {
  const s = P(e);
  return P(() => we(s(), t));
}

function St(e) {
  return P(() => {
    const t = e.name || "s";
    return {
      enterActive: (e.enterActiveClass || t + "-enter-active").split(" "),
      enter: (e.enterClass || t + "-enter").split(" "),
      enterTo: (e.enterToClass || t + "-enter-to").split(" "),
      exitActive: (e.exitActiveClass || t + "-exit-active").split(" "),
      exit: (e.exitClass || t + "-exit").split(" "),
      exitTo: (e.exitToClass || t + "-exit-to").split(" "),
      move: (e.moveClass || t + "-move").split(" "),
    };
  });
}

function je(e) {
  requestAnimationFrame(() => requestAnimationFrame(e));
}

function At(e, t, n, s) {
  const { onBeforeEnter: i, onEnter: r, onAfterEnter: l } = t;
  i == null || i(n),
    n.classList.add(...e.enter),
    n.classList.add(...e.enterActive),
    queueMicrotask(() => {
      if (!n.parentNode) return s == null ? void 0 : s();
      r == null || r(n, () => o());
    }),
    je(() => {
      n.classList.remove(...e.enter),
        n.classList.add(...e.enterTo),
        (!r || r.length < 2) &&
          (n.addEventListener("transitionend", o),
          n.addEventListener("animationend", o));
    });

  function o(c) {
    (!c || c.target === n) &&
      (s == null || s(),
      n.removeEventListener("transitionend", o),
      n.removeEventListener("animationend", o),
      n.classList.remove(...e.enterActive),
      n.classList.remove(...e.enterTo),
      l == null || l(n));
  }
}

function bt(e, t, n, s) {
  const { onBeforeExit: i, onExit: r, onAfterExit: l } = t;
  if (!n.parentNode) return s == null ? void 0 : s();
  i == null || i(n),
    n.classList.add(...e.exit),
    n.classList.add(...e.exitActive),
    r == null || r(n, () => o()),
    je(() => {
      n.classList.remove(...e.exit),
        n.classList.add(...e.exitTo),
        (!r || r.length < 2) &&
          (n.addEventListener("transitionend", o),
          n.addEventListener("animationend", o));
    });

  function o(c) {
    (!c || c.target === n) &&
      (s == null || s(),
      n.removeEventListener("transitionend", o),
      n.removeEventListener("animationend", o),
      n.classList.remove(...e.exitActive),
      n.classList.remove(...e.exitTo),
      l == null || l(n));
  }
}
var xt = {
    inout: "in-out",
    outin: "out-in",
  },
  Re = (e) => {
    const t = St(e);
    return yt(
      vt(() => e.children),
      {
        mode: xt[e.mode],
        appear: e.appear,
        onEnter(n, s) {
          At(t(), e, n, s);
        },
        onExit(n, s) {
          bt(t(), e, n, s);
        },
      }
    );
  },
  Tt = x(
    '<div class=message><div class="flex flex-row items-start justify-start gap-[0.5vh]"><div class=tag></div><div><div class=author></div><div class=text>'
  );
const $t = (e) => {
  if (e.color)
    return (() => {
      var t = Tt(),
        n = t.firstChild,
        s = n.firstChild,
        i = s.nextSibling,
        r = i.firstChild,
        l = r.nextSibling;
      return (
        v(s, () => e.channel ?? "Unknown"),
        v(r, () => {
          var o;
          return (o = e.args) == null ? void 0 : o[0];
        }),
        v(l, () => {
          var o;
          return (o = e.args) == null ? void 0 : o[1];
        }),
        W(
          (o) => {
            var c = e.multiline,
              u = `rgba(${e.color[0]}, ${e.color[1]}, ${e.color[2]}, 1)`;
            return (
              c !== o.e && Ne(t, "aria-multiline", (o.e = c)),
              u !== o.t &&
                ((o.t = u) != null
                  ? t.style.setProperty("border-color", u)
                  : t.style.removeProperty("border-color")),
              o
            );
          },
          {
            e: void 0,
            t: void 0,
          }
        ),
        t
      );
    })();
};
var Et = x("<div class=chat-window><div class=chat-messages>");
let M;
const _t = () => {
    const { data: e } = J(),
      t = () =>
        e.messages.filter((n) => {
          var s, i;
          return ((s = n.modeData) != null && s.isChannel) ||
            e.modes[e.modeIdx].isChannel
            ? n.mode === e.modes[e.modeIdx].name ||
                ((i = n.modeData) == null ? void 0 : i.isGlobal)
            : !0;
        });
    return w(Re, {
      name: "slide-fade",
      get children() {
        return w(F, {
          get when() {
            return e.showWindow && e.hideState !== A.AlwaysHide;
          },
          get children() {
            var n = Et(),
              s = n.firstChild,
              i = M;
            return (
              typeof i == "function" ? Le(i, s) : (M = s),
              v(
                s,
                w(q, {
                  get each() {
                    return t();
                  },
                  children: (r) => w($t, r),
                })
              ),
              n
            );
          },
        });
      },
    });
  },
  Ct = () => !window.invokeNative;
async function xe(e, t, n) {
  const s = {
    method: "post",
    headers: {
      "Content-Type": "application/json; charset=UTF-8",
    },
    body: JSON.stringify(t),
  };
  if (Ct() && n) return n;
  const i = window.GetParentResourceName
    ? window.GetParentResourceName()
    : "nui-frame-app";
  return await (await fetch(`https://${i}/${e}`, s)).json();
}
var Ot = x(
  '<div class=chat-input><div class=input><textarea rows=1 placeholder="Press [TAB] to switch channels"></textarea><div class=sendButton><svg width=0.46vh height=0.83vh viewBox="0 0 5 9"fill=none xmlns=http://www.w3.org/2000/svg><path d="M1 1L4 4.5L1 8"stroke=#00F8B9>'
);
let E;
const It = () => {
  const { data: e, setData: t } = J(),
    n = () => {
      clearTimeout(e.showWindowTimer),
        t(
          "showWindowTimer",
          window.setTimeout(() => {
            e.hideState !== A.AlwaysShow && !e.showInput && t("showWindow", !1);
          }, pe.fadeTimeout)
        );
    },
    s = (a = !1) => {
      setTimeout(() => {
        delete E.style.height;
      }, 50),
        a &&
          xe("chatResult", {
            canceled: a,
          }),
        t("message", ""),
        t("showInput", !1),
        clearInterval(e.focusTimer),
        e.hideState !== A.AlwaysHide ? n() : t("showWindow", !1);
    },
    i = () => (e.modeIdx >= e.modes.length ? e.modes.length - 1 : e.modeIdx),
    r = (a) => {
      a && e.oldMessages.length > e.oldMessagesIndex + 1
        ? (t("oldMessagesIndex", e.oldMessagesIndex + 1),
          t("message", e.oldMessages[e.oldMessagesIndex]))
        : !a && e.oldMessagesIndex - 1 >= 0
        ? (t("oldMessagesIndex", e.oldMessagesIndex - 1),
          t("message", e.oldMessages[e.oldMessagesIndex]))
        : !a &&
          e.oldMessagesIndex - 1 === -1 &&
          (t("oldMessagesIndex", -1), t("message", ""));
    },
    l = (a) => {
      if (a.key === "Enter") {
        c();
        return;
      }
      const d = a.which;
      if (d === 38 || d === 40) a.preventDefault(), r(d === 38);
      else if (d == 33) {
        var f = document.getElementsByClassName("chat-messages")[0];
        f.scrollTop = f.scrollTop - 100;
      } else if (d == 34) {
        var f = document.getElementsByClassName("chat-messages")[0];
        f.scrollTop = f.scrollTop + 100;
      } else if (d === 9) {
        if (a.shiftKey || a.altKey)
          do
            t("modeIdx", --e.modeIdx),
              e.modeIdx < 0 && t("modeIdx", e.modes.length - 1);
          while (e.modes[e.modeIdx].hidden);
        else
          do t("modeIdx", (e.modeIdx + 1) % e.modes.length);
          while (e.modes[e.modeIdx].hidden);
        const y = document.getElementsByClassName("chat-messages")[0];
        setTimeout(() => (y.scrollTop = y.scrollHeight), 0);
      }
      o();
    },
    o = () => {
      if (!E) return;
      const a = getComputedStyle(E),
        d = parseFloat(a.paddingBottom) + parseFloat(a.paddingTop);
      (E.style.height = "5px"), (E.style.height = E.scrollHeight - d + "px");
    },
    c = () => {
      if (e.message !== "") {
        xe("chatResult", {
          message: e.message,
          mode: e.modes[i()].name,
        });
        const a = [...e.oldMessages];
        a.unshift(e.message),
          t("oldMessages", a),
          t("oldMessagesIndex", -1),
          s();
      } else s(!0);
    },
    u = (a) => {
      a.key === "Escape" && s(!0);
    };
  return (
    ue(
      () => (
        document.addEventListener("keydown", u),
        () => document.removeEventListener("keydown", u)
      )
    ),
    (() => {
      var a = Ot(),
        d = a.firstChild,
        f = d.firstChild,
        y = f.nextSibling;
      (f.$$keydown = l),
        (f.$$keyup = o),
        (f.$$input = (p) => t("message", p.currentTarget.value));
      var h = E;
      return (
        typeof h == "function" ? Le(h, f) : (E = f),
        Ne(f, "spellcheck", !1),
        (y.$$click = () => c()),
        W(() => (f.value = e.message)),
        a
      );
    })()
  );
};
at(["input", "keyup", "keydown", "click"]);
var Nt = x('<div class="flex flex-row justify-start items-start">'),
  Lt = x("<div>");
const Mt = () => {
  const { data: e } = J();
  return (() => {
    var t = Nt();
    return (
      v(
        t,
        w(q, {
          get each() {
            return e.modes;
          },
          children: (n) => {
            if (!n.hidden)
              return (() => {
                var s = Lt();
                return (
                  v(s, () => n.displayName),
                  W(() =>
                    ct(
                      s,
                      `mode ${e.modes[e.modeIdx].name === n.name && "active"}`
                    )
                  ),
                  s
                );
              })();
          },
        })
      ),
      t
    );
  })();
};
var Pt = x(
    '<div class=suggestion><div class="flex flex-row justify-start items-start"><span class=title></span></div><div class=text>'
  ),
  kt = x("<span class=text>&nbsp;[<!>]"),
  Wt = x("<span>&nbsp;[<!>]");
const Dt = (e) =>
  (() => {
    var t = Pt(),
      n = t.firstChild,
      s = n.firstChild,
      i = n.nextSibling;
    return (
      v(s, () => e.name),
      v(
        n,
        w(q, {
          get each() {
            return e.params;
          },
          children: (r) =>
            (() => {
              var l = kt(),
                o = l.firstChild,
                c = o.nextSibling;
              return c.nextSibling, v(l, () => r.name, c), l;
            })(),
        }),
        null
      ),
      v(
        i,
        w(F, {
          get when() {
            return e.params;
          },
          get children() {
            return e.help;
          },
        }),
        null
      ),
      v(
        i,
        w(F, {
          get when() {
            return !e.disabled;
          },
          get children() {
            return w(q, {
              get each() {
                return e.params;
              },
              children: (r) =>
                (() => {
                  var l = Wt(),
                    o = l.firstChild,
                    c = o.nextSibling;
                  return c.nextSibling, v(l, () => r.help, c), l;
                })(),
            });
          },
        }),
        null
      ),
      t
    );
  })();
var Ht = x("<div class=suggestions-wrap>");
const jt = () => {
  const { data: e, setData: t } = J();

  L("ON_SUGGESTION_ADD", async ({ suggestions: i }) => {
    if (Array.isArray(i)) {
      // Check if i is an array before iterating
      let r = [...e.backingSuggestions],
        l = [...e.removedSuggestions];
      for (const o of i) {
        if (o && o.name) {
          // Check if o and o.name are defined
          l = [...l.filter((c) => c !== o.name)];
          if (!o.params) {
            o.params = [];
          }
          r = [...r.filter((c) => c.name !== o.name), o];
        }
      }
      t("backingSuggestions", [...r]);
      t("removedSuggestions", l);
    }
  });

  L("ON_SUGGESTION_REMOVE", async ({ names: i }) => {
    if (Array.isArray(i)) {
      // Check if i is an array before iterating
      let r = [...e.removedSuggestions];
      for (const l of i) {
        if (typeof l === "string") {
          // Check if l is a string
          if (r.indexOf(l) <= -1) {
            r.push(l);
          }
        }
      }
      t("removedSuggestions", r);
    }
  });
  const n = () => {
      const i = e.backingSuggestions.filter(
        (l) => e.removedSuggestions.indexOf(l.name) <= -1
      );
      if (e.message === "") return [];
      const r = i
        .filter((l) => {
          if (!l.name.startsWith(e.message)) {
            const o = l.name.split(" "),
              c = e.message.split(" ");
            for (let u = 0; u < c.length; u += 1) {
              if (u >= o.length) return u < o.length + l.params.length;
              if (o[u] !== c[u]) return !1;
            }
          }
          return !0;
        })
        .slice(0, pe.suggestionLimit);
      return (
        r.map((l) => {
          const o = !l.name.startsWith(e.message),
            c = l.params.map((u, a) => {
              const d = a === l.params.length - 1 ? "." : "\\S",
                f = new RegExp(`${l.name} (?:\\w+ ){${a}}(?:${d}*)$`, "g"),
                y = !e.message.match(f);
              return {
                ...u,
                disabled: y,
              };
            });
          return {
            ...l,
            disabled: o,
            params: c,
          };
        }),
        r
      );
    },
    s = () => {
      switch (e.hideState) {
        case A.AlwaysShow:
          return "Visible";
        case A.AlwaysHide:
          return "Hidden";
        case A.ShowWhenActive:
          return "When Active";
      }
    };
  return w(Re, {
    name: "fade",
    get children() {
      return [
        w(F, {
          get when() {
            return n().length > 0;
          },
          get children() {
            var i = Ht();
            return (
              v(
                i,
                w(q, {
                  get each() {
                    return n();
                  },
                  children: (r) => w(Dt, r),
                })
              ),
              i
            );
          },
        }),
        w(F, {
          get when() {
            return e.showHideState;
          },
          get children() {
            return s();
          },
        }),
      ];
    },
  });
};
var Rt = x("<div class=input-container>"),
  Bt = x("<div class=App>");
const pe = {
    defaultTemplateId: "default",
    defaultAltTemplateId: "defaultAlt",
    templates: {
      default: '<span class="greenText">{0}</span>: {1}',
      defaultAlt: "{0}",
      print: "<pre>{0}</pre>",
      "example:important": "<h1>{0}</h1>",
    },
    fadeTimeout: 4e3,
    suggestionLimit: 5,
    style: {
      background: "rgba(52, 73, 94, 0.0)",
      width: "30vw",
      height: "30%",
    },
  },
  Ft = () => {
    const { data: e, setData: t } = J(),
      n = () => {
        clearTimeout(e.showWindowTimer),
          t(
            "showWindowTimer",
            window.setTimeout(() => {
              e.hideState !== A.AlwaysShow &&
                !e.showInput &&
                t("showWindow", !1);
            }, pe.fadeTimeout)
          );
      };
    return (
      L(
        "ON_SCREEN_STATE_CHANGE",
        async ({ hideState: s, fromUserInteraction: i }) => {
          t("hideState", s),
            s === A.AlwaysHide
              ? !e.showInput && t("showWindow", !1)
              : e.hideState === A.AlwaysShow
              ? (t("showWindow", !0),
                e.showWindowTimer && clearTimeout(e.showWindowTimer))
              : n(),
            i &&
              (t("showHideState", !0),
              e.showHideStateTimer && clearTimeout(e.showHideStateTimer),
              t(
                "showHideStateTimer",
                window.setTimeout(() => {
                  t("showHideState", !1);
                }, 1500)
              ));
        }
      ),
      L("ON_OPEN", async () => {
        t("showInput", !0),
          t("showWindow", !0),
          e.showWindowTimer && clearTimeout(e.showWindowTimer),
          t(
            "focusTimer",
            window.setInterval(() => {
              E ? E.focus() : clearInterval(e.focusTimer);
            }, 100)
          ),
          M && (M.scrollTop = M.scrollHeight);
      }),
      L("ON_MESSAGE", ({ message: s }) => {
        (s.id = `${new Date().getTime() + Math.random()}`),
          (s.modeData = e.modes.find((i) => i.name === s.mode)),
          t("messages", [...e.messages, s]),
          e.hideState !== A.AlwaysHide &&
            (e.showWindowTimer && clearTimeout(e.showWindowTimer),
            t("showWindow", !0),
            n(),
            M &&
              M.scroll({
                top: M.scrollHeight,
              }));
      }),
      L("ON_CLEAR", () => {
        t("messages", []), t("oldMessages", []), t("oldMessagesIndex", -1);
      }),
      L("ON_MODE_ADD", (s) => {
        const i = [...e.modes.filter((r) => r.name !== s.name), s];
        t("modes", i);
      }),
      L("ON_MODE_REMOVE", ({ name: s }) => {
        let i = e.modes.filter((r) => r.name !== s);
        i.length === 0 && (i = [He]), t("modes", i);
      }),
      (() => {
        var s = Bt();
        return (
          v(s, w(_t, {}), null),
          v(
            s,
            w(F, {
              get when() {
                return e.showInput;
              },
              get children() {
                var i = Rt();
                return v(i, w(It, {}), null), v(i, w(Mt, {}), null), i;
              },
            }),
            null
          ),
          v(s, w(jt, {}), null),
          s
        );
      })()
    );
  },
  Gt = document.getElementById("root");
lt(
  () =>
    w(wt, {
      get children() {
        return w(Ft, {});
      },
    }),
  Gt
);
