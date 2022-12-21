import domtoimage from "dom-to-image";

const Summary = ({ miles, states, trips }) => {
  const prettyPrintNum = (num) => {
    return Math.ceil(Number(num))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="result">
      <div>
        <svg
          width="800"
          height="800"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          id="summary-svg"
        >
          <style>@import url("./fonts.css")</style>
          <rect width="800" height="800" fill="#003A7B" />
          <text
            x="35"
            y="88"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            This year, you took {trips.length}
          </text>
          <text
            x="35"
            y="170"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            {trips.length === 1 ? "trip" : "trips"}{" "}
            <tspan fontWeight="700" fontStyle="italic">
              {prettyPrintNum(miles)} miles
            </tspan>
            , through
          </text>
          <text
            x="35"
            y="248"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            <tspan fontWeight="700" fontStyle="italic">
              {states.length} states
            </tspan>
            , while creating less
          </text>
          <text
            x="35"
            y="326"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            than{" "}
            <tspan fontWeight="700" fontStyle="italic">
              50% the emissions
            </tspan>{" "}
            of
          </text>
          <text
            x="35"
            y="404"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            a plane, or less than{" "}
            <tspan fontWeight="700" fontStyle="italic">
              45% the
            </tspan>
          </text>
          <text
            x="35"
            y="482"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            <tspan fontWeight="700" fontStyle="italic">
              emissions
            </tspan>{" "}
            of a car. That’s
          </text>
          <text
            x="35"
            y="560"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            how you{" "}
            <tspan fontWeight="700" fontStyle="italic">
              Amtraked
            </tspan>{" "}
            in 2022,
          </text>
          <text
            x="35"
            y="638"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            what does 2023 have in
          </text>
          <text
            x="35"
            y="716"
            width="730"
            height="78"
            style={{
              fontSize: "52px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            store?
          </text>

          <rect
            x="735"
            y="897"
            width="908"
            height="21.6668"
            transform="rotate(-90 735 897)"
            fill="#CF202E"
          />
          <rect
            x="756.667"
            y="897"
            width="908"
            height="21.6668"
            transform="rotate(-90 756.667 897)"
            fill="white"
          />
          <rect
            x="778.334"
            y="897"
            width="908"
            height="21.6668"
            transform="rotate(-90 778.334 897)"
            fill="#0078B9"
          />
          <text
            x="400"
            y="752"
            width="800"
            height="78"
            style={{
              fontSize: "32px",
              textAnchor: "middle",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            backtrak.amtraker.com
          </text>
        </svg>
      </div>
      <button
        onClick={() => {
          const svgElement =
            document.getElementById("summary-svg").parentElement;
          console.log("cloning");
          let clonedSvgElement = svgElement.cloneNode(true);
          console.log(clonedSvgElement);
          clonedSvgElement.setAttribute("width", "800");
          clonedSvgElement.setAttribute("height", "800");

          console.log("getting image with dom-to-image");

          domtoimage
            .toPng(clonedSvgElement, {
              width: 800,
              height: 800,
            })
            .then((dataUrl) => {
              //console.log(dataUrl)
              const a = document.createElement("a");
              a.href = dataUrl;
              a.download = "amtraker-backtrak-summary.png";
              a.click();
            })
            .catch((e) => {
              console.log("error", e);
            });
        }}
      >
        Download
      </button>
    </div>
  );
};

export default Summary;
