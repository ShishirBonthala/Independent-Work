import { useState } from "react";

const BENEFITS = [
  { id: "b1", category: "Core", label: "Medical / Health Insurance", description: "PPO, HMO, and HDHP plan updates, open enrollment windows, network and coverage changes.", stat: "Offered by 97% of employers" },
  { id: "b2", category: "Core", label: "Dental Insurance", description: "Preventive, basic, and major dental coverage updates, provider network changes, and annual limits.", stat: "Offered by 99% of employers" },
  { id: "b3", category: "Core", label: "Vision Insurance", description: "Eye exam coverage, glasses and contact lens allowances, and in-network provider updates.", stat: "Offered by 96% of employers" },
  { id: "b4", category: "Core", label: "401(k) / Retirement Plan", description: "Contribution limits, employer match details (avg. ~6%), Roth option availability, and investment fund updates.", stat: "Offered by 93% of employers" },
  { id: "b5", category: "Core", label: "Life Insurance", description: "Group life and AD&D coverage amounts, beneficiary reminders, and supplemental life purchase windows.", stat: "Near-universal at mid-size+ employers" },
  { id: "b6", category: "Core", label: "Short & Long-Term Disability", description: "Claim procedures, waiting periods, income replacement rates, and return-to-work program updates.", stat: "STD: 78% - LTD: 86% of employers" },
  { id: "b7", category: "Core", label: "HSA / FSA Accounts", description: "Annual contribution limits, eligible expenses, rollover rules, and enrollment or change windows.", stat: "HSA: 61% - FSA: 60% of employers" },
  { id: "b8", category: "Core", label: "Paid Time Off (PTO)", description: "Vacation, sick leave, and holiday policies, accrual rates, rollover limits, and blackout periods.", stat: "Offered by 95%+ of employers" },
  { id: "b9", category: "Supplemental", label: "Paid Parental & Family Leave", description: "Paid leave for new parents and family caregiving beyond FMLA minimums, including adoption and foster care.", stat: "31% offer paid family leave beyond FMLA" },
  { id: "b10", category: "Supplemental", label: "Mental Health Coverage", description: "Behavioral health benefits, therapy and psychiatric coverage, telehealth mental health access, and parity updates.", stat: "Included by 90% of health plans" },
  { id: "b11", category: "Supplemental", label: "Employee Assistance (EAP)", description: "Free short-term counseling, crisis support, financial and legal referrals, and work-life resources.", stat: "Offered by 80%+ of employers" },
  { id: "b12", category: "Supplemental", label: "Wellness Programs", description: "Fitness stipends, biometric screenings, stress management tools, and wellbeing challenge participation.", stat: "Offered by 39% of employers" },
  { id: "b13", category: "Supplemental", label: "Flexible & Hybrid Work", description: "Remote work policies, flextime during core hours, schedule change announcements, and return-to-office updates.", stat: "Hybrid: 60% - Flextime: 51% of employers" },
  { id: "b14", category: "Supplemental", label: "Professional Development & Tuition", description: "Formal training programs, upskilling/reskilling resources, certification reimbursement, and tuition assistance.", stat: "Training: 82% - Upskilling: 79% of employers" },
  { id: "b15", category: "Supplemental", label: "Lifestyle & Voluntary Perks", description: "Pet insurance, legal and financial planning services, and lifestyle spending accounts (LSAs) for employee-directed perks.", stat: "LSA adoption up from 8% to 19% in one year" },
];

const COMPANIES = [
  { id: "co1", name: "Acme Corp" },
  { id: "co2", name: "TechStart Inc" },
];

const USERS = [
  { id: "u1", companyId: "co1", username: "alice", password: "password", name: "Alice Johnson" },
  { id: "u2", companyId: "co1", username: "bob", password: "password", name: "Bob Smith" },
  { id: "u3", companyId: "co1", username: "priya", password: "password", name: "Priya Mehta" },
  { id: "u4", companyId: "co2", username: "carol", password: "password", name: "Carol Davis" },
  { id: "u5", companyId: "co2", username: "dave", password: "password", name: "Dave Lee" },
];

const CAT_DESC = {
  Core: "Foundational, employer-sponsored benefits available to all eligible employees.",
  Supplemental: "Optional extras that go beyond the basics to support your lifestyle and career.",
};

const THEMES = {
  light: {
    name: "Light",
    appBg: "#F7F8FA",
    surface: "#FFFFFF",
    panel: "#F9FAFB",
    text: "#111827",
    muted: "#6B7280",
    subtle: "#9CA3AF",
    border: "#E5E7EB",
    quietBorder: "#F3F4F6",
    inputBg: "#FFFFFF",
    inputBorder: "#D1D5DB",
    headerBg: "#111827",
    headerText: "#FFFFFF",
    headerMuted: "#9CA3AF",
    primaryBg: "#111827",
    primaryText: "#FFFFFF",
    rowYes: "#F8FFF9",
    rowNo: "#FFF8F8",
    warning: "#92400E",
    toastBg: "#111827",
    category: {
      Core: { border: "#BFDBFE", text: "#1D4ED8", dot: "#3B82F6", bg: "#EFF6FF" },
      Supplemental: { border: "#DDD6FE", text: "#6D28D9", dot: "#8B5CF6", bg: "#F5F3FF" },
    },
  },
  dark: {
    name: "Dark",
    appBg: "#0F172A",
    surface: "#111827",
    panel: "#1F2937",
    text: "#F9FAFB",
    muted: "#CBD5E1",
    subtle: "#94A3B8",
    border: "#334155",
    quietBorder: "#1F2937",
    inputBg: "#0B1220",
    inputBorder: "#475569",
    headerBg: "#020617",
    headerText: "#F8FAFC",
    headerMuted: "#CBD5E1",
    primaryBg: "#F8FAFC",
    primaryText: "#111827",
    rowYes: "rgba(34, 197, 94, 0.12)",
    rowNo: "rgba(239, 68, 68, 0.12)",
    warning: "#FBBF24",
    toastBg: "#020617",
    category: {
      Core: { border: "#1D4ED8", text: "#BFDBFE", dot: "#60A5FA", bg: "#172554" },
      Supplemental: { border: "#6D28D9", text: "#DDD6FE", dot: "#A78BFA", bg: "#2E1065" },
    },
  },
};

const DEFAULT_SETTINGS = { preferences: {}, theme: "light" };

function themeStyles(theme) {
  return {
    card: { background: theme.surface, borderRadius: 10, border: `1px solid ${theme.border}` },
    lbl: { display: "block", fontSize: 11, fontWeight: 700, color: theme.muted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 },
    input: { width: "100%", padding: "9px 12px", border: `1px solid ${theme.inputBorder}`, borderRadius: 7, fontSize: 14, outline: "none", fontFamily: "inherit", background: theme.inputBg, color: theme.text },
    btnPrimary: { display: "inline-flex", alignItems: "center", gap: 6, padding: "9px 18px", background: theme.primaryBg, color: theme.primaryText, border: "none", borderRadius: 7, fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" },
    btnGhost: { display: "inline-flex", alignItems: "center", gap: 6, padding: "7px 13px", background: "transparent", border: `1px solid ${theme.border}`, borderRadius: 7, fontSize: 12, cursor: "pointer", color: theme.muted, fontFamily: "inherit" },
  };
}

async function readStorage(key) {
  if (window.storage?.get) {
    const value = await window.storage.get(key);
    return value?.value ?? null;
  }

  return window.localStorage.getItem(key);
}

async function writeStorage(key, value) {
  if (window.storage?.set) {
    await window.storage.set(key, value);
    return;
  }

  window.localStorage.setItem(key, value);
}

function normalizeSettings(raw) {
  if (!raw || typeof raw !== "object") return DEFAULT_SETTINGS;
  if ("preferences" in raw || "theme" in raw) {
    return {
      preferences: raw.preferences && typeof raw.preferences === "object" ? raw.preferences : {},
      theme: raw.theme === "dark" ? "dark" : "light",
    };
  }

  return { preferences: raw, theme: "light" };
}

async function loadSettings(userId) {
  try {
    const value = await readStorage(`prefs:${userId}`);
    return normalizeSettings(value ? JSON.parse(value) : null);
  } catch {
    return DEFAULT_SETTINGS;
  }
}

async function persistSettings(userId, data) {
  try {
    await writeStorage(`prefs:${userId}`, JSON.stringify(data));
    return true;
  } catch {
    return false;
  }
}

function Checkbox({ checked, onChange, label }) {
  const handleKeyDown = (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onChange();
    }
  };

  return (
    <div
      aria-checked={checked}
      aria-label={label}
      onClick={onChange}
      onKeyDown={handleKeyDown}
      role="checkbox"
      tabIndex={0}
      style={{
        width: 18,
        height: 18,
        border: checked ? "2px solid #111827" : "2px solid #D1D5DB",
        borderRadius: 4,
        background: checked ? "#111827" : "#fff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "all 0.12s",
        flexShrink: 0,
      }}
    >
      {checked && (
        <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
          <path d="M1 4L4 7.5L10 1" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

function Toast({ message, visible, theme }) {
  return (
    <div
      style={{
        position: "fixed",
        bottom: 24,
        right: 24,
        background: theme.toastBg,
        color: "#fff",
        padding: "10px 16px",
        borderRadius: 8,
        fontSize: 13,
        display: "flex",
        alignItems: "center",
        gap: 8,
        opacity: visible ? 1 : 0,
        transition: "opacity 0.2s",
        pointerEvents: "none",
        zIndex: 999,
        border: `1px solid ${theme.border}`,
      }}
    >
      {message}
    </div>
  );
}

function ThemeSelector({ value, onChange, theme }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6, padding: 3, border: `1px solid ${theme.border}`, borderRadius: 999, background: theme.panel }}>
      {Object.entries(THEMES).map(([id, option]) => {
        const active = value === id;
        return (
          <button
            aria-pressed={active}
            key={id}
            onClick={() => onChange(id)}
            style={{
              border: "none",
              borderRadius: 999,
              padding: "5px 10px",
              background: active ? theme.primaryBg : "transparent",
              color: active ? theme.primaryText : theme.muted,
              cursor: "pointer",
              fontSize: 11,
              fontWeight: 700,
            }}
            type="button"
          >
            {option.name}
          </button>
        );
      })}
    </div>
  );
}

function LoginView({ onLogin, theme }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const s = themeStyles(theme);

  const attempt = async (u, p) => {
    const user = USERS.find((x) => x.username === u && x.password === p);
    if (!user) {
      setError("Incorrect username or password.");
      return;
    }

    const saved = await loadSettings(user.id);
    onLogin(user, saved);
  };

  const co1 = USERS.filter((u) => u.companyId === "co1");
  const co2 = USERS.filter((u) => u.companyId === "co2");

  return (
    <div style={{ minHeight: "100vh", background: theme.appBg, color: theme.text, fontFamily: "'Inter', system-ui, sans-serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 46, height: 46, background: theme.primaryBg, color: theme.primaryText, borderRadius: 11, marginBottom: 14, fontSize: 17, fontWeight: 800 }}>PH</div>
          <h1 style={{ fontSize: 21, fontWeight: 700, margin: "0 0 4px", letterSpacing: "-0.3px" }}>Preference Hub</h1>
          <p style={{ color: theme.muted, fontSize: 13, margin: 0 }}>Sign in to manage your benefits preferences</p>
        </div>

        <div style={{ ...s.card, padding: 24, marginBottom: 14 }}>
          <div style={{ marginBottom: 14 }}>
            <label style={s.lbl}>Username</label>
            <input
              autoComplete="username"
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && attempt(username, password)}
              placeholder="Enter your username"
              style={s.input}
              value={username}
            />
          </div>
          <div style={{ marginBottom: error ? 12 : 20 }}>
            <label style={s.lbl}>Password</label>
            <input
              autoComplete="current-password"
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => e.key === "Enter" && attempt(username, password)}
              placeholder="Enter your password"
              style={s.input}
              type="password"
              value={password}
            />
          </div>
          {error && (
            <div style={{ padding: "8px 12px", background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 6, color: "#DC2626", fontSize: 13, marginBottom: 14 }}>
              {error}
            </div>
          )}
          <button onClick={() => attempt(username, password)} style={{ ...s.btnPrimary, width: "100%", justifyContent: "center", padding: 11 }}>
            Sign in
          </button>
        </div>

        <div style={{ ...s.card, padding: 18 }}>
          <div style={{ ...s.lbl, marginBottom: 12 }}>5 demo users - all passwords are "password"</div>
          {[
            { label: "Acme Corp", users: co1 },
            { label: "TechStart Inc", users: co2 },
          ].map(({ label, users }) => (
            <div key={label} style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 10, color: theme.subtle, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 6 }}>{label}</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6 }}>
                {users.map((u) => (
                  <button
                    key={u.id}
                    onClick={() => {
                      setUsername(u.username);
                      setPassword("password");
                      setError("");
                      attempt(u.username, "password");
                    }}
                    style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: theme.panel, border: `1px solid ${theme.border}`, borderRadius: 7, cursor: "pointer", fontFamily: "inherit", textAlign: "left" }}
                    type="button"
                  >
                    <div style={{ width: 28, height: 28, borderRadius: "50%", background: u.companyId === "co1" ? "#DBEAFE" : "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: u.companyId === "co1" ? "#1D4ED8" : "#6D28D9", flexShrink: 0 }}>
                      {u.name.split(" ").map((w) => w[0]).join("")}
                    </div>
                    <div>
                      <div style={{ fontSize: 12, fontWeight: 600, color: theme.text }}>{u.name}</div>
                      <div style={{ fontSize: 11, color: theme.subtle }}>{u.username}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PreferenceView({ user, prefs, onPrefChange, onSave, onLogout, dirty, toastVisible, themeId, theme, onThemeChange }) {
  const company = COMPANIES.find((c) => c.id === user.companyId);
  const cats = ["Core", "Supplemental"];
  const s = themeStyles(theme);

  const stats = {
    y: BENEFITS.filter((b) => prefs[b.id] === true).length,
    n: BENEFITS.filter((b) => prefs[b.id] === false).length,
    u: BENEFITS.filter((b) => prefs[b.id] === undefined).length,
  };

  return (
    <div style={{ minHeight: "100vh", background: theme.appBg, fontFamily: "'Inter', system-ui, sans-serif", color: theme.text }}>
      <div style={{ background: theme.headerBg, padding: "0 28px", minHeight: 54, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ display: "inline-flex", width: 24, height: 24, alignItems: "center", justifyContent: "center", borderRadius: 6, background: theme.primaryBg, color: theme.primaryText, fontSize: 11, fontWeight: 800 }}>PH</span>
          <span style={{ fontWeight: 700, fontSize: 15, color: theme.headerText, letterSpacing: "-0.2px" }}>Preference Hub</span>
          <span style={{ color: theme.border }}>-</span>
          <span style={{ fontSize: 13, color: theme.headerMuted }}>{company.name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap", justifyContent: "flex-end" }}>
          <ThemeSelector onChange={onThemeChange} theme={theme} value={themeId} />
          <div style={{ width: 28, height: 28, borderRadius: "50%", background: user.companyId === "co1" ? "#DBEAFE" : "#EDE9FE", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: user.companyId === "co1" ? "#1D4ED8" : "#6D28D9" }}>
            {user.name.split(" ").map((w) => w[0]).join("")}
          </div>
          <span style={{ fontSize: 13, color: theme.headerMuted }}>{user.name}</span>
          <button onClick={onLogout} style={{ ...s.btnGhost, fontSize: 11, color: theme.headerMuted, border: `1px solid ${theme.border}`, padding: "4px 10px" }}>
            Sign out
          </button>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "32px auto", padding: "0 24px" }}>
        <div style={{ marginBottom: 24 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 6px", letterSpacing: "-0.3px" }}>My Benefits Preferences</h2>
          <p style={{ color: theme.muted, fontSize: 14, margin: 0, lineHeight: 1.6 }}>
            Let us know which benefits topics you want to hear about throughout the year.
            We will only send you communications that are relevant to what you care about.
          </p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 28, flexWrap: "wrap" }}>
          {[
            { l: "Interested", c: stats.y, bg: "#DCFCE7", t: "#15803D", d: "#22C55E" },
            { l: "Not Interested", c: stats.n, bg: "#FEE2E2", t: "#DC2626", d: "#EF4444" },
            { l: "No Response", c: stats.u, bg: theme.panel, t: theme.muted, d: theme.border },
          ].map((x) => (
            <div key={x.l} style={{ display: "flex", alignItems: "center", gap: 6, padding: "5px 14px", background: x.bg, borderRadius: 20, fontSize: 12, color: x.t, fontWeight: 600, border: `1px solid ${theme.border}` }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: x.d, display: "inline-block" }} />
              {x.c} {x.l}
            </div>
          ))}
        </div>

        {cats.map((cat) => {
          const items = BENEFITS.filter((b) => b.category === cat);
          const cs = theme.category[cat];
          return (
            <div key={cat} style={{ marginBottom: 28 }}>
              <div style={{ background: cs.bg, border: `1px solid ${cs.border}`, borderRadius: 10, padding: "14px 18px", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: cs.dot, display: "inline-block", flexShrink: 0 }} />
                  <span style={{ fontSize: 13, fontWeight: 700, color: cs.text, textTransform: "uppercase", letterSpacing: "0.07em" }}>{cat} Benefits</span>
                </div>
                <p style={{ margin: 0, fontSize: 13, color: cs.text, opacity: 0.9, lineHeight: 1.5, paddingLeft: 17 }}>{CAT_DESC[cat]}</p>
              </div>

              <div style={s.card}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 95px 125px", padding: "9px 22px", background: theme.panel, borderBottom: `1px solid ${theme.quietBorder}`, gap: 12, alignItems: "center" }}>
                  <span style={s.lbl}>Benefit</span>
                  <span style={s.lbl}>What's included</span>
                  <span style={{ ...s.lbl, textAlign: "center" }}>Interested</span>
                  <span style={{ ...s.lbl, textAlign: "center" }}>Not Interested</span>
                </div>

                {items.map((b, i) => {
                  const v = prefs[b.id];
                  return (
                    <div
                      key={b.id}
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 95px 125px",
                        alignItems: "center",
                        padding: "14px 22px",
                        gap: 12,
                        borderTop: i > 0 ? `1px solid ${theme.quietBorder}` : "none",
                        background: v === true ? theme.rowYes : v === false ? theme.rowNo : theme.surface,
                        transition: "background 0.15s",
                      }}
                    >
                      <div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: theme.text, marginBottom: 3 }}>{b.label}</div>
                        <div style={{ fontSize: 11, color: theme.subtle }}>{b.stat}</div>
                      </div>
                      <div style={{ fontSize: 12, color: theme.muted, lineHeight: 1.5 }}>{b.description}</div>

                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Checkbox checked={v === true} label={`${b.label} interested`} onChange={() => (v === true ? onPrefChange(b.id, null) : onPrefChange(b.id, true))} />
                      </div>

                      <div style={{ display: "flex", justifyContent: "center" }}>
                        <Checkbox checked={v === false} label={`${b.label} not interested`} onChange={() => (v === false ? onPrefChange(b.id, null) : onPrefChange(b.id, false))} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}

        <div style={{ position: "sticky", bottom: 0, background: theme.surface, borderTop: `1px solid ${theme.border}`, padding: "12px 22px", display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 8, borderRadius: "10px 10px 0 0" }}>
          <span style={{ fontSize: 12, color: dirty ? theme.warning : theme.muted }}>{dirty ? "Unsaved changes" : "All changes saved"}</span>
          <button onClick={onSave} style={{ ...s.btnPrimary, opacity: dirty ? 1 : 0.45, cursor: dirty ? "pointer" : "default" }}>
            Save preferences
          </button>
        </div>

        <p style={{ fontSize: 12, color: theme.subtle, textAlign: "center", marginTop: 12, paddingBottom: 32 }}>
          Click a checked box to clear your selection. Unchecked means no preference has been captured yet.
        </p>
      </div>

      <Toast message="Preferences saved" theme={theme} visible={toastVisible} />
    </div>
  );
}

export default function App() {
  const [session, setSession] = useState(null);
  const [prefs, setPrefs] = useState({});
  const [themeId, setThemeId] = useState("light");
  const [dirty, setDirty] = useState(false);
  const [toastVisible, setToastVisible] = useState(false);
  const theme = THEMES[themeId];

  const handlePrefChange = (id, val) => {
    setPrefs((p) => {
      const next = { ...p };
      if (val === null) delete next[id];
      else next[id] = val;
      return next;
    });
    setDirty(true);
  };

  const handleThemeChange = (nextTheme) => {
    if (nextTheme === themeId) return;
    setThemeId(nextTheme);
    setDirty(true);
  };

  const handleSave = async () => {
    if (!dirty || !session) return;
    const ok = await persistSettings(session.id, { preferences: prefs, theme: themeId });
    if (ok) {
      setDirty(false);
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2200);
    }
  };

  const handleLogin = (user, savedSettings) => {
    setSession(user);
    setPrefs(savedSettings.preferences);
    setThemeId(savedSettings.theme);
    setDirty(false);
  };

  const handleLogout = () => {
    setSession(null);
    setPrefs({});
    setDirty(false);
  };

  if (!session) {
    return <LoginView onLogin={handleLogin} theme={theme} />;
  }

  return (
    <PreferenceView
      dirty={dirty}
      onLogout={handleLogout}
      onPrefChange={handlePrefChange}
      onSave={handleSave}
      onThemeChange={handleThemeChange}
      prefs={prefs}
      theme={theme}
      themeId={themeId}
      toastVisible={toastVisible}
      user={session}
    />
  );
}
