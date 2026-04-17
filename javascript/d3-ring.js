let rendered = false;

const CREST_OUTLINE =
  "M349.082,232.883C238.34,335.317,32.471,254.635,33.656,122.244" +
  "c0.693-77.516,92.615-105.469,182.234-66.003" +
  "c-93.611-34.067-153.29-0.713-153.29,52.746" +
  "c0,70.809,99.048,138.641,175.37,116.037" +
  "l-57.64-38.326h7.254l86.388,41.546" +
  "C188.508,278.925,24.852,194.6,53.475,88.735" +
  "C14.3,203.958,198.087,313.593,312.612,232.038" +
  "l-119.462-45.34h5.533L349.082,232.883z";

const CREST_BASE_W = 400;
const CREST_BASE_H = 370;

const LEAF_OUTLINE = "m-90 2030 45-863a95 95 0 0 0-111-98l-859 151 116-320a65 65 0 0 0-20-73l-941-762 212-99a65 65 0 0 0 34-79l-186-572 542 115a65 65 0 0 0 73-38l105-247 423 454a65 65 0 0 0 111-57l-204-1052 327 189a65 65 0 0 0 91-27l332-652 332 652a65 65 0 0 0 91 27l327-189-204 1052a65 65 0 0 0 111 57l423-454 105 247a65 65 0 0 0 73 38l542-115-186 572a65 65 0 0 0 34 79l212 99-941 762a65 65 0 0 0-20 73l116 320-859-151a95 95 0 0 0-111 98l45 863z";

function initVisualization() {
  if (rendered) return;
  const wrapper = document.getElementById("chart-container");
  if (!wrapper || !wrapper.clientWidth || !wrapper.clientHeight) return;
  rendered = true;
  build("chart-container");
}

function build(targetId) {
  const wrapper = document.getElementById(targetId);
  const w = wrapper.clientWidth;
  const h = wrapper.clientHeight;

  const total = webringData.sites.length;
  const dotSize = 8;
  const dotColor = "#4a4a54";
  const hoverColor = "#0077c2";
  const lineColor = "#2a2a30";
  const crestColor = "#1e1e22";

  const svg = d3
    .select(`#${targetId}`)
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .attr("viewBox", `0 0 ${w} ${h}`)
    .style("background-color", "#111114")
    .style("cursor", "move");

  const g = svg.append("g");

  const zoom = d3
    .zoom()
    .scaleExtent([0.02, 4])
    .on("zoom", (ev) => {
      g.attr("transform", ev.transform);
    });

  svg.call(zoom);

  webringData.sites.forEach((entry, idx) => {
    entry.id = `node-${idx}`;
  });

  function getScaleTier(width) {
    if (width < 480)  return { crest: 1.40, outline: 1500, intro: 2.0, offX: -20, offY:  50 };
    if (width < 768)  return { crest: 1.15, outline: 1800, intro: 2.2, offX: -30, offY:  65 };
    if (width < 1024) return { crest: 1.00, outline: 2100, intro: 2.4, offX: -35, offY:  75 };
    if (width < 1440) return { crest: 0.90, outline: 2300, intro: 2.6, offX: -40, offY:  80 };
    return              { crest: 0.80, outline: 2600, intro: 2.8, offX: -50, offY: 100 };
  }
  const tier = getScaleTier(w);

  const scaleX = w / CREST_BASE_W;
  const scaleY = h / CREST_BASE_H;
  const crestScale = Math.min(scaleX, scaleY) * tier.crest;
  const crestOffsetX = (w - CREST_BASE_W * crestScale) / 2 + tier.offX;
  const crestOffsetY = (h - CREST_BASE_H * crestScale) / 2 + tier.offY;

  const outlineScale = Math.min(w, h) / tier.outline;
  const trace = svg.append("path")
    .attr("d", LEAF_OUTLINE)
    .attr("fill", "none")
    .attr("stroke", "none")
    .attr("transform", `translate(${w / 2},${h / 2}) scale(${outlineScale})`);

  const traceLength = trace.node().getTotalLength();

  webringData.sites.forEach((entry, i) => {
    const along = (traceLength * i) / total;
    const p = trace.node().getPointAtLength(along);
    entry.x = w / 2 + p.x * outlineScale;
    entry.y = h / 2 + p.y * outlineScale;
  });

  trace.remove();

  g.append("path")
    .attr("d", CREST_OUTLINE)
    .attr("fill", crestColor)
    .attr("stroke", "none")
    .attr("transform", `translate(${crestOffsetX},${crestOffsetY}) scale(${crestScale})`);

  const title = g.append("g")
    .attr("transform", `translate(${crestOffsetX},${crestOffsetY}) scale(${crestScale})`);

  title.append("text")
    .attr("x", 100).attr("y", 110)
    .attr("fill", crestColor)
    .attr("font-family", "Georgia, 'Times New Roman', serif")
    .attr("font-size", "60px").attr("font-weight", "bold")
    .attr("letter-spacing", "6px").text("GEORGE");

  title.append("text")
    .attr("x", 130).attr("y", 165)
    .attr("fill", crestColor)
    .attr("font-family", "Georgia, 'Times New Roman', serif")
    .attr("font-size", "56px").attr("font-weight", "bold")
    .attr("letter-spacing", "5px").text("BROWN");

  title.append("text")
    .attr("x", 240).attr("y", 192)
    .attr("fill", crestColor)
    .attr("font-family", "Georgia, 'Times New Roman', serif")
    .attr("font-size", "28px").attr("font-weight", "bold")
    .attr("letter-spacing", "5px").text("POLYTECHNIC");

  const edges = webringData.sites.map((entry, idx) => ({
    source: entry.id,
    target: webringData.sites[(idx + 1) % total].id,
  }));

  const link = g
    .append("g")
    .selectAll("line")
    .data(edges)
    .enter()
    .append("line")
    .attr("stroke", lineColor)
    .attr("stroke-opacity", 1)
    .attr("stroke-width", 1);

  const node = g
    .append("g")
    .selectAll("g")
    .data(webringData.sites)
    .enter()
    .append("g")
    .call(
      d3
        .drag()
        .on("start", dragStart)
        .on("drag", dragMove)
        .on("end", dragEnd)
    );

  node
    .append("circle")
    .attr("r", dotSize)
    .attr("fill", dotColor)
    .on("mouseover", hover)
    .on("mouseout", leave)
    .on("click", openSite);

  node
    .append("text")
    .attr("text-anchor", "middle")
    .attr("dy", dotSize + 12)
    .text((d) => d.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))
    .attr("fill", "#6b6b75")
    .attr("font-family", "'IBM Plex Mono', ui-monospace, monospace")
    .style("font-size", "9px")
    .style("pointer-events", "none");

  const sim = d3
    .forceSimulation()
    .force(
      "link",
      d3.forceLink().id((d) => d.id).distance(40).strength(0.15)
    )
    .force("collision", d3.forceCollide().radius(dotSize * 1.2))
    .alphaDecay(0.05)
    .velocityDecay(0.6);

  sim.nodes(webringData.sites).on("tick", tick);
  sim.force("link").links(edges);

  function tick() {
    link
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y);
    node.attr("transform", (d) => `translate(${d.x},${d.y})`);
  }

  function centerView(animate) {
    let xMin = Infinity, yMin = Infinity;
    let xMax = -Infinity, yMax = -Infinity;
    node.each((d) => {
      xMin = Math.min(xMin, d.x);
      yMin = Math.min(yMin, d.y);
      xMax = Math.max(xMax, d.x);
      yMax = Math.max(yMax, d.y);
    });
    const margin = 60;
    xMin -= margin; yMin -= margin;
    xMax += margin; yMax += margin;
    const vw = wrapper.clientWidth;
    const vh = wrapper.clientHeight;
    const viewScale = Math.min(vw / (xMax - xMin), vh / (yMax - yMin)) * 0.8;
    const midX = (xMin + xMax) / 2;
    const midY = (yMin + yMax) / 2;
    const t = d3.zoomIdentity.translate(vw / 2, vh / 2).scale(viewScale).translate(-midX, -midY);
    if (animate) {
      svg.transition()
        .duration(750)
        .ease(d3.easeCubicInOut)
        .call(zoom.transform, t);
    } else {
      svg.call(zoom.transform, t);
    }
  }

  svg.call(
    zoom.transform,
    d3.zoomIdentity.translate(w / 2, h / 2).scale(tier.intro).translate(-w / 2, -h / 2)
  );

  sim.on("tick", () => {
    tick();
    if (sim.alpha() < 0.1) {
      sim.alphaTarget(0);
      centerView(true);
      sim.on("tick", tick);
    }
  });

  function dragStart(ev, d) {
    if (!ev.active) sim.alphaTarget(0.3).restart();
    svg.style("cursor", "grabbing");
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragMove(ev, d) {
    d.fx = ev.x;
    d.fy = ev.y;
  }

  function dragEnd(ev, d) {
    if (!ev.active) sim.alphaTarget(0);
    svg.style("cursor", "grab");
    d.fx = null;
    d.fy = null;
  }

  function hover() {
    d3.select(this).attr("fill", hoverColor);
    svg.style("cursor", "pointer");
  }

  function leave() {
    d3.select(this).attr("fill", dotColor);
    svg.style("cursor", "move");
  }

  function openSite(ev, d) {
    window.open(d.website, "_blank");
  }

  const hint = svg.append("text")
    .attr("x", w / 2).attr("y", 24)
    .attr("text-anchor", "middle")
    .attr("fill", "#6b6b75")
    .attr("font-family", "'IBM Plex Mono', ui-monospace, monospace")
    .attr("font-size", "13px")
    .text("Zoom in to find your fellow friends' sites");

  const counterBox = svg.append("rect")
    .attr("fill", "#1a1a1f").attr("opacity", 0.7)
    .attr("x", 5).attr("y", h - 30)
    .attr("rx", 5).attr("ry", 5);

  const counter = svg.append("text")
    .attr("x", 10).attr("y", h - 13)
    .attr("fill", "#4a4a54")
    .attr("font-family", "'IBM Plex Mono', ui-monospace, monospace")
    .attr("font-size", "12px");

  counterBox.raise();
  counter.raise();
  counter.text(`Students contributed: ${total}`);
  const labelWidth = counter.node().getComputedTextLength();
  counterBox.attr("width", labelWidth + 20).attr("height", 25);

  window.addEventListener("resize", () => {
    const rw = wrapper.clientWidth;
    const rh = wrapper.clientHeight;
    if (!rw || !rh) return;
    svg.attr("viewBox", `0 0 ${rw} ${rh}`);
    hint.attr("x", rw / 2);
    counterBox.attr("y", rh - 30);
    counter.attr("y", rh - 13);
    centerView(false);
    sim.alpha(0.3).restart();
  });
}

window.addEventListener("resize", initVisualization);
