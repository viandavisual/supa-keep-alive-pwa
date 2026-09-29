const $ = s => document.querySelector(s);
const projectsEl = $("#projects");
const template = $("#projectTemplate");
const refreshBtn = $("#refreshBtn");
const installBtn = $("#installBtn");
let installPrompt;

function fmtDate(value){
  if(!value) return "—";
  const d = new Date(value);
  if(Number.isNaN(d.getTime())) return value;
  return new Intl.DateTimeFormat("es-ES",{day:"2-digit",month:"2-digit",hour:"2-digit",minute:"2-digit"}).format(d);
}

function render(data){
  projectsEl.innerHTML = "";
  const items = data.projects || [];
  for(const p of items){
    const node = template.content.cloneNode(true);
    const card = node.querySelector(".projectCard");
    const status = (p.status || "unknown").toLowerCase();
    card.classList.add(status);
    node.querySelector(".projectAccount").textContent = p.accountLabel || "CUENTA INDEPENDIENTE";
    node.querySelector(".projectName").textContent = p.name;
    const pill = node.querySelector(".statusPill");
    pill.textContent = status === "ok" ? "ONLINE" : status === "error" ? "ERROR" : "SIN DATOS";
    pill.classList.add(status);
    node.querySelector(".statusText").textContent = status === "ok" ? "HEALTH CHECK CORRECTO" : status === "error" ? "REVISAR PROYECTO" : "PENDIENTE DE PRIMER CHECK";
    node.querySelector(".lastCheck").textContent = fmtDate(p.lastCheck);
    node.querySelector(".response").textContent = p.httpStatus ? `${p.httpStatus} ${p.message || ""}`.trim() : (p.message || "—");
    const history = node.querySelector(".history");
    (p.history || []).slice(0,7).forEach(h=>{
      const b=document.createElement("span"); b.className=h.status||"unknown"; b.title=`${h.date}: ${h.status}`; history.appendChild(b);
    });
    projectsEl.appendChild(node);
  }
  const updated = data.generatedAt ? fmtDate(data.generatedAt) : "sin ejecución todavía";
  $("#systemMessage").textContent = `Último ciclo automático: ${updated}`;
  $("#lastPanelUpdate").textContent = `PANEL · ${new Date().toLocaleTimeString("es-ES",{hour:"2-digit",minute:"2-digit"})}`;
}

async function load(){
  refreshBtn.disabled = true;
  try{
    const r = await fetch(`data/status.json?t=${Date.now()}`,{cache:"no-store"});
    if(!r.ok) throw new Error(`HTTP ${r.status}`);
    render(await r.json());
  }catch(e){
    $("#systemMessage").textContent = "No se ha podido cargar status.json.";
  }finally{ refreshBtn.disabled=false; }
}
refreshBtn.addEventListener("click",load);

window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault(); installPrompt=e; installBtn.classList.remove("hidden");
});
installBtn.addEventListener("click",async()=>{
  if(!installPrompt) return;
  installPrompt.prompt();
  await installPrompt.userChoice;
  installPrompt=null; installBtn.classList.add("hidden");
});
if("serviceWorker" in navigator) window.addEventListener("load",()=>navigator.serviceWorker.register("sw.js"));
load();
