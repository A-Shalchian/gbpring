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

const HUSKY_OUTLINE = "M182.6 87.9L168.7 88.9L167.7 87.9L162.2 87.9L161.2 87.0L158.5 87.0L152.9 85.2L150.1 83.3L146.4 82.4L144.5 80.5L142.7 80.5L134.3 72.2L131.5 66.6L129.7 65.7L126.0 65.7L125.1 64.7L120.4 64.7L119.5 63.8L112.1 63.8L111.1 62.9L111.1 55.5L108.4 49.9L108.4 48.0L102.8 41.5L100.9 41.5L101.9 44.3L101.9 54.5L100.9 57.3L96.3 62.0L91.6 62.9L89.8 61.0L89.8 56.4L87.0 49.0L85.2 47.1L85.2 45.3L78.7 38.8L75.9 37.8L76.8 49.9L65.7 69.4L63.8 77.7L62.0 78.7L61.0 80.5L54.5 81.4L42.5 87.9L36.9 92.6L29.5 100.9L29.5 102.8L34.1 101.9L35.1 104.6L27.6 113.0L22.1 123.2L20.2 132.5L19.3 133.4L19.3 138.0L21.1 138.0L24.8 135.3L27.6 135.3L29.5 137.1L30.4 145.5L32.3 147.3L32.3 150.1L35.1 155.7L41.5 164.0L42.5 164.0L44.3 166.8L49.0 170.5L49.0 171.4L62.0 171.4L61.0 168.7L61.0 162.2L60.1 161.2L61.0 149.2L62.9 146.4L63.8 142.7L65.7 140.8L65.7 139.0L72.2 131.5L74.0 130.6L74.9 124.1L78.7 117.6L83.3 113.9L83.3 113.0L81.4 113.0L75.9 117.6L74.0 117.6L73.1 114.8L75.9 111.1L75.9 109.3L81.4 103.7L81.4 100.0L87.0 97.2L95.4 96.3L96.3 95.4L103.7 95.4L103.7 94.4L98.1 92.6L93.5 87.9L93.5 82.4L94.4 80.5L99.1 76.8L104.6 74.9L113.0 74.0L113.9 73.1L124.1 74.0L134.3 83.3L140.8 87.0L142.7 87.0L145.5 88.9L159.4 93.5L164.9 94.4L166.8 100.0L168.7 101.9L173.3 103.7L173.3 107.4L165.9 112.1L142.7 112.1L134.3 115.8L130.6 119.5L130.6 122.3L126.0 125.1L122.3 125.1L113.9 127.8L108.4 130.6L107.4 132.5L105.6 132.5L100.9 136.2L98.1 139.9L97.2 139.9L92.6 145.5L91.6 148.2L89.8 149.2L84.2 159.4L81.4 159.4L80.5 158.5L81.4 148.2L83.3 145.5L83.3 143.6L88.9 137.1L89.8 134.3L81.4 139.0L74.9 147.3L72.2 154.7L72.2 164.0L74.0 168.7L74.0 171.4L92.6 171.4L92.6 169.6L97.2 162.2L101.9 157.5L104.6 158.5L106.5 164.9L108.4 164.9L108.4 159.4L109.3 156.6L113.0 151.0L115.8 152.0L116.7 156.6L118.6 160.3L119.5 160.3L120.4 147.3L122.3 145.5L122.3 143.6L125.1 138.0L132.5 131.5L138.0 130.6L139.0 129.7L142.7 129.7L143.6 128.8L152.0 128.8L152.9 127.8L155.7 127.8L166.8 123.2L173.3 118.6L178.9 111.1L179.8 107.4L181.6 105.6L181.6 102.8L183.5 99.1L183.5 89.8Z";
const HUSKY_W = 200;
const HUSKY_H = 200;

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
    .filter((ev) => {
      if (ev.type === 'wheel') return true;
      return !ev.ctrlKey && !ev.button;
    })
    .on("zoom", (ev) => {
      g.attr("transform", ev.transform);
    });

  svg.call(zoom);
  svg.on("wheel.zoom", function(ev) {
    ev.preventDefault();
    const currentTransform = d3.zoomTransform(this);
    if (ev.ctrlKey || Math.abs(ev.deltaY) > Math.abs(ev.deltaX) && !ev.deltaX) {
      const scale = currentTransform.k * Math.pow(2, -ev.deltaY * 0.002);
      const t = currentTransform.scale(scale / currentTransform.k);
      svg.call(zoom.transform, t);
    } else {
      const t = currentTransform.translate(-ev.deltaX / currentTransform.k, -ev.deltaY / currentTransform.k);
      svg.call(zoom.transform, t);
    }
  }, { passive: false });

  webringData.sites.forEach((entry, idx) => {
    entry.id = `node-${idx}`;
  });

  function getScaleTier(width) {
    if (width < 480)  return { crest: 1.40, intro: 2.0, offX: -20, offY:  50 };
    if (width < 768)  return { crest: 1.15, intro: 2.2, offX: -30, offY:  65 };
    if (width < 1024) return { crest: 1.00, intro: 2.4, offX: -35, offY:  75 };
    if (width < 1440) return { crest: 0.90, intro: 2.6, offX: -40, offY:  80 };
    return              { crest: 0.80, intro: 2.8, offX: -50, offY: 100 };
  }
  const tier = getScaleTier(w);

  const scaleX = w / CREST_BASE_W;
  const scaleY = h / CREST_BASE_H;
  const crestScale = Math.min(scaleX, scaleY) * tier.crest;
  const crestOffsetX = (w - CREST_BASE_W * crestScale) / 2 + tier.offX;
  const crestOffsetY = (h - CREST_BASE_H * crestScale) / 2 + tier.offY;

  const huskyScale = Math.min(w / HUSKY_W, h / HUSKY_H) * 2.5;
  const huskyOffsetX = (w - HUSKY_W * huskyScale) / 2;
  const huskyOffsetY = (h - HUSKY_H * huskyScale) / 2;

  const trace = svg.append("path")
    .attr("d", HUSKY_OUTLINE)
    .attr("fill", "none")
    .attr("stroke", "none");

  const traceLength = trace.node().getTotalLength();

  webringData.sites.forEach((entry, i) => {
    const along = (traceLength * i) / total;
    const p = trace.node().getPointAtLength(along);
    entry.targetX = huskyOffsetX + p.x * huskyScale;
    entry.targetY = huskyOffsetY + p.y * huskyScale;
    entry.x = entry.targetX;
    entry.y = entry.targetY;
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
    .attr("dy", dotSize + 10)
    .text((d) => d.website.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, ""))
    .attr("fill", "#6b6b75")
    .attr("font-family", "'IBM Plex Mono', ui-monospace, monospace")
    .style("font-size", "9px")
    .style("pointer-events", "none");

  const sim = d3
    .forceSimulation()
    .force(
      "link",
      d3.forceLink().id((d) => d.id).distance(100)
    )
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(w / 2, h / 2))
    .force("collision", d3.forceCollide().radius(dotSize * 2))
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
