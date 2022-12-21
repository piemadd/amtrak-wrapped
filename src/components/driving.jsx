import domtoimage from "dom-to-image";

const Driving = ({ grams }) => {

  const lbs = grams / 453.59237;

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
          id="driving-svg"
        >
          <style>@import url("./fonts.css")</style>
          <rect width="800" height="800" fill="#003A7B" />
          <text
            x="35"
            y="73"
            width="730"
            height="78"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            Instead of driving those miles,
          </text>
          <text
            x="35"
            y="130"
            width="730"
            height="78"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            you kept
          </text>
          <text
            x="400"
            y="322"
            width="800"
            height="78"
            textAnchor="middle"
            style={{
              fontSize: "200px",
              fontWeight: "700",
              fontStyle: 'italic',
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            {prettyPrintNum(lbs)}
            <tspan fontSize="64px">lbs</tspan>
          </text>
          <text
            x="400"
            y="424"
            width="800"
            height="78"
            textAnchor="middle"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            of CO<tspan fontSize="24px">2</tspan> out of the atmosphere!
          </text>
          <rect y="478" width="800" height="12" fill="white" />
          <rect y="574" width="800" height="12" fill="white" />
          <rect y="670" width="800" height="12" fill="white" />
          <rect y="490" width="800" height="84" fill="#EF3824" />
          <rect y="586" width="800" height="84" fill="#0078B9" />
          <text
            x="400"
            y="752"
            width="800"
            height="78"
            textAnchor="middle"
            style={{
              fontSize: "32px",
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
            document.getElementById("driving-svg").parentElement;
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
              a.download = "amtraker-backtrak-driving.png";
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

export default Driving;
