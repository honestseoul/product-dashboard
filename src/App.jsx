import { useState } from "react";

const RAW_DATA = [
  { name: "테니스팔찌 잠금 리뉴얼", stage: "최종샘플제작중", manager: "조안나", dday: "", desc: "- 3프롱\n2.0/2.5/1부 원본 완료 → 금샘플 진행중\n2부/3부 완료\n\n- 4프롱\n2.0/2.5 출력완료→원본완료\n2.8/1부 원본완료 → 금샘플진행중\n2부/3부 완료", updated: "2026-03-05", ref: "진행 보류" },
  { name: "6프롱 4프롱 1/1.5/2캐럿 파베밴드", stage: "최종제품완료", manager: "박지혜", dday: "2026-01-30", desc: "스위츠 출시때 맞춰서\n매장 이동 완료(2/12)", updated: "2026-03-05", ref: "" },
  { name: "클라우드 테니스팔찌 파베/볼", stage: "매장출시준비중", manager: "박지혜", dday: "2026-04-01", desc: "샘플 촬영\n4월1일 변경 예정\n매장에서 제품 회수해서 변경 예정\n상세페이지 대기", updated: "2026-03-05", ref: "" },
  { name: "십자가 1.5mm 2.0mm", stage: "은샘플테스트", manager: "박지혜", dday: "", desc: "1/29 캐드완료\n1/29 출력보냄\n2/10 은샘플완료 (은정님 / 유나님)", updated: "2026-03-05", ref: "" },
  { name: "팬시컷 애끼링", stage: "최종샘플제작중", manager: "조안나", dday: "2026-01-30", desc: "팬시컷5종 원본 6호,11호 두가지로 제작. 상세페이지 대기", updated: "2026-03-05", ref: "백화점) 5월출시 예정" },
  { name: "미니클라우드 스터드 귀걸이 CPX", stage: "", manager: "박지혜", dday: "", desc: "3/4 견본 원본 샘플 제작 중", updated: "2026-03-04", ref: "" },
  { name: "[유로] 리본 팬던트", stage: "", manager: "박지혜", dday: "", desc: "맘에 안들어서 최종 탈락", updated: "2026-03-05", ref: "" },
  { name: "7캐럿 레디언트 반지", stage: "은샘플테스트", manager: "조안나", dday: "2026-03-09", desc: "- 컴파스 세팅 (2/19)\n- 두줄 세팅 (2/12)", updated: "2026-03-05", ref: "https://www.figma.com/design/P5pKem5FZK2dlpUQY2UxPn/" },
  { name: "1캐럿 페어/오벌/에멜 팬던트", stage: "최종제품완료", manager: "박지혜", dday: "2026-03-31", desc: "상세페이지 대기\n매장 이동 완료(3/5)", updated: "2026-03-06", ref: "" },
  { name: "실꼬임팔찌", stage: "은샘플테스트", manager: "박지혜", dday: "2026-05-01", desc: "1/30 샘플 완료\n2/24~ 지은님 테스트\n3/5 2차 샘플 캐드 예정", updated: "2026-03-05", ref: "" },
  { name: "면세용 저중량 귀걸이", stage: "은샘플제작중", manager: "조안나", dday: "", desc: "페어 3*2 은샘플완료(2/13)\n프린세스 3*3 은샘플완료(2/13)\n페어 4*2.5 캐드작업 -보류\n래디언트컷 캐드작업-사이즈이슈로 에메랄드 작은사이즈로 변경\n에메랄드 4*3, 하트컷 (3/5)은샘플제작시작", updated: "2026-03-05", ref: "" },
  { name: "실버 거울", stage: "최종제품완료", manager: "박지혜", dday: "", desc: "", updated: "2026-03-05", ref: "https://www.instagram.com/p/DSDR30njDZn/" },
  { name: "말 팬던트", stage: "최종제품완료", manager: "조안나", dday: "", desc: "(2/12)은주물 세공실", updated: "2026-03-05", ref: "https://www.instagram.com/p/DTqCLTuEb-4/" },
  { name: "열쇠 팬던트 (랩다이아를 세팅한)", stage: "", manager: "박지혜", dday: "", desc: "", updated: "2026-03-04", ref: "https://www.instagram.com/p/DTC6cIzCLuP/" },
  { name: "조약돌 팬던트", stage: "드롭", manager: "박지혜", dday: "", desc: "2/10 은샘플 완료 / 안나님 인수인계 후 종료", updated: "2026-03-05", ref: "" },
  { name: "가위", stage: "최종제품완료", manager: "박지혜", dday: "", desc: "3/4 도금 진행 (신주)", updated: "2026-03-05", ref: "" },
  { name: "페어 1캐럿 펙해드 반지 / 파베 반지", stage: "매장출시준비중", manager: "박지혜", dday: "2026-03-31", desc: "원본 제작 완료(2/9)\nDP재고 제작 완료(2/13)\n매장 이동 완료(2/27)\n상세페이지 대기", updated: "2026-03-05", ref: "" },
  { name: "에메랄드컷 펙헤드 반지 / 파베 반지", stage: "원본제작중", manager: "박지혜", dday: "2026-03-31", desc: "2/24 원본 출력 진행\n3/6 DP재고 발주 진행", updated: "2026-03-05", ref: "" },
  { name: "페어2캐럿 난간없는 샘플", stage: "드롭", manager: "박지혜", dday: "", desc: "2/10 은샘플 출고\n테스트에서 실패 → 식세기에서 알 빠짐", updated: "2026-03-05", ref: "" },
  { name: "오벌컷1캐럿 반지/파베반지", stage: "매장출시준비중", manager: "박지혜", dday: "2026-03-31", desc: "DP재고 생산 완료(2/11)\n매장 이동 완료(2/28)\n상세페이지 대기", updated: "2026-03-05", ref: "" },
  { name: "2/2.5/3mm 미니이터니티 스터드 면세용", stage: "출력중", manager: "박지혜", dday: "", desc: "2/26 은샘플 제작 완료\n3/4 2차 샘플 출력중", updated: "2026-03-05", ref: "" },
  { name: "십자가 1.5mm Lsize", stage: "은샘플테스트", manager: "박지혜", dday: "", desc: "2/26 은샘플 제작 완료(설아님)", updated: "2026-03-04", ref: "" },
  { name: "클라우드 팬던트 추가 수정", stage: "은샘플제작중", manager: "조안나", dday: "", desc: "은샘플확인 후 금출력으로 한번 더 확인 (3/4)", updated: "2026-03-05", ref: "" },
  { name: "(롯잠) 핀", stage: "최종제품완료", manager: "박지혜", dday: "", desc: "", updated: "2026-03-05", ref: "" },
  { name: "클라우드 레이어 반지 / 주요사이즈 원본", stage: "드롭", manager: "박지혜", dday: "", desc: "제작 공정상 이슈로 종료", updated: "2026-03-05", ref: "" },
  { name: "원석 은 팬던트", stage: "은샘플제작중", manager: "조안나", dday: "", desc: "캐드파일 엠제이에 전달 / 엠제이 원석전달 (3/3)", updated: "2026-03-05", ref: "" },
  { name: "심볼 피어스 팬던트", stage: "출력중", manager: "박지혜", dday: "", desc: "3/4", updated: "2026-03-05", ref: "" },
  { name: "클라우드 커플링 / 남자 디자인 추가 2종", stage: "출력중", manager: "박지혜", dday: "", desc: "3/3 1종 선출고 / 다른 1종 캐드 수정 중\n선출고건 두께 올려서 금출력 예정 17호", updated: "2026-03-05", ref: "" },
  { name: "매듭 스프링장식 팬던트", stage: "캐드중", manager: "조안나", dday: "", desc: "", updated: "2026-03-06", ref: "" },
  { name: "클라우드 n.b34 n.4b34 꼬냑", stage: "캐드중", manager: "", dday: "", desc: "", updated: "2026-03-06", ref: "" },
  { name: "심볼 실팔찌 - 저가형 / 고가형", stage: "", manager: "", dday: "", desc: "", updated: "2026-03-05", ref: "" },
  { name: "팬시컷 실팔찌 - 페어, 에메랄드, 오벌", stage: "", manager: "", dday: "", desc: "", updated: "2026-03-05", ref: "2부 - 페어, 오벌\n3부 - 에메랄드" },
  { name: "주얼리 반다나", stage: "", manager: "", dday: "", desc: "", updated: "2026-01-29", ref: "" },
  { name: "은행 브로치", stage: "", manager: "", dday: "", desc: "", updated: "2026-01-29", ref: "" },
  { name: "단추", stage: "", manager: "", dday: "", desc: "", updated: "2026-01-30", ref: "" },
];

const STAGE_ORDER = ["캐드중","출력중","은샘플제작중","은샘플테스트","원본제작중","최종샘플제작중","최종제품완료","매장출시준비중","매장출시완료","드롭","기타"];

const STAGE_CONFIG = {
  "캐드중":        { color: "#64748b", bg: "#f1f5f9", border: "#cbd5e1", icon: "✏️" },
  "출력중":        { color: "#7c3aed", bg: "#f5f3ff", border: "#ddd6fe", icon: "🖨️" },
  "은샘플제작중":  { color: "#9333ea", bg: "#faf5ff", border: "#e9d5ff", icon: "🥈" },
  "은샘플테스트":  { color: "#c026d3", bg: "#fdf4ff", border: "#f0abfc", icon: "🔬" },
  "원본제작중":    { color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe", icon: "🔧" },
  "최종샘플제작중":{ color: "#d97706", bg: "#fffbeb", border: "#fde68a", icon: "⚙️" },
  "최종제품완료":  { color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0", icon: "✅" },
  "매장출시준비중":{ color: "#ea580c", bg: "#fff7ed", border: "#fed7aa", icon: "🏪" },
  "매장출시완료":  { color: "#0891b2", bg: "#ecfeff", border: "#a5f3fc", icon: "🎉" },
  "드롭":          { color: "#dc2626", bg: "#fef2f2", border: "#fecaca", icon: "🚫" },
  "기타":          { color: "#9ca3af", bg: "#f9fafb", border: "#e5e7eb", icon: "📌" },
};

function daysSince(d) {
  if (!d) return null;
  return Math.floor((Date.now() - new Date(d).getTime()) / 86400000);
}

function dDayLabel(d) {
  if (!d) return null;
  const diff = Math.ceil((new Date(d).getTime() - Date.now()) / 86400000);
  if (diff < 0) return { label: `D+${Math.abs(diff)}`, color: "#dc2626", bg: "#fef2f2" };
  if (diff === 0) return { label: "D-Day", color: "#d97706", bg: "#fffbeb" };
  return { label: `D-${diff}`, color: diff <= 7 ? "#ea580c" : "#16a34a", bg: diff <= 7 ? "#fff7ed" : "#f0fdf4" };
}

function Card({ item, onClick }) {
  const cfg = STAGE_CONFIG[item.stage] || STAGE_CONFIG["기타"];
  const days = daysSince(item.updated);
  const dd = dDayLabel(item.dday);
  const [hov, setHov] = useState(false);
  const urgentColor = days > 14 ? "#dc2626" : days > 7 ? "#d97706" : "#16a34a";
  const urgentBg   = days > 14 ? "#fef2f2" : days > 7 ? "#fffbeb" : "#f0fdf4";

  return (
    <div
      onClick={() => onClick(item)}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? cfg.bg : "#ffffff",
        border: `1px solid ${hov ? cfg.border : "#e5e7eb"}`,
        borderLeft: `3px solid ${cfg.color}`,
        borderRadius: "0 10px 10px 0",
        padding: "12px 16px",
        cursor: "pointer",
        transition: "all 0.15s",
        boxShadow: hov ? `0 2px 12px ${cfg.color}18` : "0 1px 2px #0000000a",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 8 }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", lineHeight: 1.4, flex: 1 }}>
          {item.name}
        </span>
        <div style={{ display: "flex", gap: 4, flexShrink: 0, alignItems: "center" }}>
          {dd && <span style={{ fontSize: 10, fontWeight: 800, color: dd.color, background: dd.bg, padding: "1px 7px", borderRadius: 99 }}>{dd.label}</span>}
          {item.manager && <span style={{ fontSize: 10, color: "#6b7280", background: "#f3f4f6", padding: "1px 7px", borderRadius: 99 }}>{item.manager}</span>}
        </div>
      </div>

      {item.desc && (
        <p style={{ margin: "6px 0 0", fontSize: 11, color: "#6b7280", lineHeight: 1.6, whiteSpace: "pre-wrap" }}>
          {item.desc.length > 100 ? item.desc.slice(0, 100) + "…" : item.desc}
        </p>
      )}

      {days !== null && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 8 }}>
          <div style={{ flex: 1, height: 3, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
            <div style={{ width: `${Math.min(days / 30, 1) * 100}%`, height: "100%", background: urgentColor, borderRadius: 99 }} />
          </div>
          <span style={{ fontSize: 10, color: urgentColor, background: urgentBg, fontWeight: 700, padding: "1px 6px", borderRadius: 99, whiteSpace: "nowrap" }}>
            {days}일 경과
          </span>
        </div>
      )}
    </div>
  );
}

function Modal({ item, onClose }) {
  if (!item) return null;
  const cfg = STAGE_CONFIG[item.stage] || STAGE_CONFIG["기타"];
  const dd = dDayLabel(item.dday);
  const days = daysSince(item.updated);
  const urgentColor = days > 14 ? "#dc2626" : days > 7 ? "#d97706" : "#16a34a";
  const urgentBg   = days > 14 ? "#fef2f2" : days > 7 ? "#fffbeb" : "#f0fdf4";

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "#00000030", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div onClick={e => e.stopPropagation()} style={{
        background: "#fff", border: "1px solid #e5e7eb", borderRadius: 16,
        padding: 28, maxWidth: 520, width: "90%", maxHeight: "80vh", overflowY: "auto",
        boxShadow: "0 20px 60px #00000018",
      }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
          <div>
            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: cfg.color, fontWeight: 700, background: cfg.bg, padding: "3px 10px", borderRadius: 99, marginBottom: 8 }}>
              {cfg.icon} {item.stage || "단계 미지정"}
            </span>
            <h2 style={{ margin: 0, fontSize: 17, fontWeight: 900, color: "#111827" }}>{item.name}</h2>
          </div>
          <button onClick={onClose} style={{ background: "#f3f4f6", border: "none", color: "#6b7280", fontSize: 18, cursor: "pointer", borderRadius: 99, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center" }}>×</button>
        </div>

        <div style={{ display: "flex", gap: 6, flexWrap: "wrap", marginBottom: 18 }}>
          {item.manager && <span style={{ fontSize: 11, background: "#f3f4f6", color: "#374151", padding: "4px 10px", borderRadius: 99 }}>👤 {item.manager}</span>}
          {dd && <span style={{ fontSize: 11, color: dd.color, background: dd.bg, padding: "4px 10px", borderRadius: 99, fontWeight: 700 }}>{dd.label} ({item.dday})</span>}
          {days !== null && <span style={{ fontSize: 11, color: urgentColor, background: urgentBg, padding: "4px 10px", borderRadius: 99 }}>🕐 {days}일 경과</span>}
        </div>

        {item.desc && (
          <div style={{ marginBottom: 16 }}>
            <p style={{ margin: "0 0 6px", fontSize: 10, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>설명</p>
            <div style={{ fontSize: 13, color: "#374151", lineHeight: 1.8, whiteSpace: "pre-wrap", background: "#f9fafb", borderRadius: 8, padding: "12px 14px", border: "1px solid #f3f4f6" }}>
              {item.desc}
            </div>
          </div>
        )}

        {item.ref && (
          <div>
            <p style={{ margin: "0 0 6px", fontSize: 10, color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em" }}>참고</p>
            {item.ref.startsWith("http")
              ? <a href={item.ref} target="_blank" rel="noreferrer" style={{ fontSize: 12, color: "#2563eb", wordBreak: "break-all" }}>🔗 {item.ref}</a>
              : <div style={{ fontSize: 13, color: "#374151", background: "#f9fafb", borderRadius: 8, padding: "10px 14px" }}>{item.ref}</div>
            }
          </div>
        )}
      </div>
    </div>
  );
}

function StageSection({ stage, cfg, items, onSelect }) {
  const [open, setOpen] = useState(stage !== "드롭" && stage !== "최종제품완료" && stage !== "매장출시완료");
  return (
    <div style={{ marginBottom: 16 }}>
      <div onClick={() => setOpen(o => !o)} style={{
        display: "flex", alignItems: "center", gap: 8, cursor: "pointer",
        padding: "7px 10px", borderRadius: 8, userSelect: "none",
        background: open ? cfg.bg : "transparent",
        marginBottom: open ? 8 : 0, transition: "background 0.15s",
      }}>
        <div style={{ width: 3, height: 16, background: cfg.color, borderRadius: 99 }} />
        <span style={{ fontSize: 12, fontWeight: 800, color: cfg.color }}>{cfg.icon} {stage}</span>
        <span style={{ fontSize: 10, color: "#9ca3af", background: "#f3f4f6", padding: "1px 7px", borderRadius: 99 }}>{items.length}개</span>
        <span style={{ color: "#d1d5db", fontSize: 10, marginLeft: "auto" }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ display: "flex", flexDirection: "column", gap: 5, paddingLeft: 11 }}>
          {items.map((item, i) => <Card key={i} item={item} onClick={onSelect} />)}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [search, setSearch] = useState("");
  const [filterManager, setFilterManager] = useState("전체");
  const [showDrop, setShowDrop] = useState(false);
  const [selected, setSelected] = useState(null);

  const managers = ["전체", ...Array.from(new Set(RAW_DATA.map(d => d.manager).filter(Boolean)))];

  const filtered = RAW_DATA.filter(d => {
    if (!d.name.trim()) return false;
    if (!showDrop && d.stage === "드롭") return false;
    if (filterManager !== "전체" && d.manager !== filterManager) return false;
    if (search && !d.name.includes(search) && !d.desc.includes(search)) return false;
    return true;
  });

  const grouped = {};
  STAGE_ORDER.forEach(s => { grouped[s] = []; });
  filtered.forEach(d => {
    const key = d.stage || "기타";
    if (!grouped[key]) grouped[key] = [];
    grouped[key].push(d);
  });

  const activeStages = STAGE_ORDER.filter(s => grouped[s]?.length > 0);
  const active = RAW_DATA.filter(d => d.name.trim() && d.stage !== "드롭" && d.stage !== "최종제품완료" && d.stage !== "매장출시완료");
  const urgent = active.filter(d => daysSince(d.updated) > 7);
  const doneCount = RAW_DATA.filter(d => d.stage === "최종제품완료" || d.stage === "매장출시완료").length;
  const today = new Date().toLocaleDateString("ko-KR", { year: "numeric", month: "long", day: "numeric", weekday: "long" });

  // 상세페이지 대기 항목
  const detailWaiting = filtered.filter(d => d.desc.includes("상세페이지 대기") || (d.ref && d.ref.includes("상세페이지 대기")));

  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@400;500;700;900&display=swap" rel="stylesheet" />
      <div style={{ minHeight: "100vh", background: "#f8fafc", fontFamily: "'Noto Sans KR', sans-serif", color: "#111827" }}>

        {/* 헤더 */}
        <div style={{ background: "#fff", borderBottom: "1px solid #e5e7eb", padding: "20px 24px 18px" }}>
          <div style={{ maxWidth: 860, margin: "0 auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
              <h1 style={{ margin: 0, fontSize: 18, fontWeight: 900, letterSpacing: "0.04em" }}>HNST PRODUCT DASHBOARD</h1>
            </div>
            <p style={{ margin: "0 0 16px", fontSize: 11, color: "#9ca3af" }}>{today}</p>

            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              {[
                { label: "진행중", value: active.length, color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
                { label: "완료", value: doneCount, color: "#16a34a", bg: "#f0fdf4", border: "#bbf7d0" },
                { label: "상세페이지 대기", value: RAW_DATA.filter(d => d.name.trim() && (d.desc.includes("상세페이지 대기") || (d.ref && d.ref.includes("상세페이지 대기")))).length, color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
                { label: "7일+ 미업데이트", value: urgent.length, color: urgent.length > 0 ? "#dc2626" : "#9ca3af", bg: urgent.length > 0 ? "#fef2f2" : "#f9fafb", border: urgent.length > 0 ? "#fecaca" : "#e5e7eb" },
              ].map(s => (
                <div key={s.label} style={{ display: "flex", alignItems: "center", gap: 10, background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10, padding: "10px 16px" }}>
                  <span style={{ fontSize: 20, fontWeight: 900, color: s.color }}>{s.value}</span>
                  <span style={{ fontSize: 11, color: s.color, fontWeight: 600 }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ maxWidth: 860, margin: "0 auto", padding: "20px 24px 60px" }}>
          {/* 필터 */}
          <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap", alignItems: "center" }}>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="제품명 / 내용 검색…"
              style={{ flex: 1, minWidth: 150, padding: "8px 14px", borderRadius: 8, background: "#fff", border: "1px solid #e5e7eb", color: "#111827", fontSize: 12, outline: "none", fontFamily: "inherit" }}
              onFocus={e => e.target.style.borderColor = "#2563eb"}
              onBlur={e => e.target.style.borderColor = "#e5e7eb"}
            />
            <div style={{ display: "flex", gap: 4 }}>
              {managers.map(m => (
                <button key={m} onClick={() => setFilterManager(m)} style={{
                  padding: "7px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
                  background: filterManager === m ? "#2563eb" : "#fff",
                  color: filterManager === m ? "#fff" : "#6b7280",
                  border: `1px solid ${filterManager === m ? "#2563eb" : "#e5e7eb"}`,
                }}>
                  {m}
                </button>
              ))}
            </div>
            <button onClick={() => setShowDrop(v => !v)} style={{
              padding: "7px 12px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer", fontFamily: "inherit",
              background: showDrop ? "#fef2f2" : "#fff", color: showDrop ? "#dc2626" : "#9ca3af",
              border: `1px solid ${showDrop ? "#fecaca" : "#e5e7eb"}`,
            }}>
              🚫 드롭 {showDrop ? "숨기기" : "보기"}
            </button>
          </div>

          {/* 상세페이지 대기 섹션 */}
          {detailWaiting.length > 0 && (
            <div style={{ background: "#fffbeb", border: "1.5px solid #fde68a", borderRadius: 12, padding: "16px 20px", marginBottom: 18, boxShadow: "0 1px 4px #f59e0b10" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <span style={{ fontSize: 16 }}>📄</span>
                <span style={{ fontSize: 13, fontWeight: 900, color: "#b45309" }}>상세페이지 대기</span>
                <span style={{ fontSize: 10, background: "#fef3c7", color: "#d97706", border: "1px solid #fde68a", padding: "1px 8px", borderRadius: 99, fontWeight: 700 }}>
                  {detailWaiting.length}개
                </span>
                <span style={{ fontSize: 11, color: "#9ca3af", marginLeft: 4 }}>— 콘텐츠팀 액션 필요</span>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {detailWaiting.map((item, i) => {
                  const cfg = STAGE_CONFIG[item.stage] || STAGE_CONFIG["기타"];
                  const dd = dDayLabel(item.dday);
                  return (
                    <div key={i} onClick={() => setSelected(item)} style={{
                      background: "#fff", border: "1px solid #fde68a",
                      borderLeft: `3px solid ${cfg.color}`,
                      borderRadius: "0 8px 8px 0", padding: "10px 14px",
                      cursor: "pointer", display: "flex", alignItems: "center", gap: 10,
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fffbeb"}
                    onMouseLeave={e => e.currentTarget.style.background = "#fff"}
                    >
                      <span style={{ fontSize: 10, fontWeight: 700, color: cfg.color, background: cfg.bg, padding: "2px 7px", borderRadius: 99, whiteSpace: "nowrap" }}>
                        {cfg.icon} {item.stage || "미지정"}
                      </span>
                      <span style={{ fontSize: 13, fontWeight: 700, color: "#111827", flex: 1 }}>{item.name}</span>
                      {dd && <span style={{ fontSize: 10, fontWeight: 800, color: dd.color, background: dd.bg, padding: "1px 7px", borderRadius: 99, whiteSpace: "nowrap" }}>{dd.label}</span>}
                      {item.manager && <span style={{ fontSize: 10, color: "#6b7280", background: "#f3f4f6", padding: "1px 7px", borderRadius: 99, whiteSpace: "nowrap" }}>{item.manager}</span>}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* 목록 */}
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #e5e7eb", padding: "18px 20px", boxShadow: "0 1px 4px #00000008" }}>
            {activeStages.map(stage => (
              <StageSection key={stage} stage={stage} cfg={STAGE_CONFIG[stage] || STAGE_CONFIG["기타"]} items={grouped[stage]} onSelect={setSelected} />
            ))}
            {activeStages.length === 0 && (
              <p style={{ color: "#9ca3af", textAlign: "center", padding: "40px 0", margin: 0 }}>검색 결과가 없습니다.</p>
            )}
          </div>
        </div>

        {selected && <Modal item={selected} onClose={() => setSelected(null)} />}
      </div>
    </>
  );
}
