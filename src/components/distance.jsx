import domtoimage from "dom-to-image";
import { useEffect } from "react";
import { saveAs } from "file-saver";
import { Base64 } from "js-base64";

const Distance = ({ distance }) => {
  const prettyPrintNum = (num) => {
    return Math.ceil(Number(num))
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };

  return (
    <div className="result">
      <div>
        <svg
          id="distance-svg"
          viewBox="0 0 800 800"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <style>@import url("./fonts.css")</style>
          <rect width="800" height="800" fill="#003A7B" />
          <g id="lines">
            <path
              id="Vector 3"
              d="M-266.95 629.443C-262.915 630.201 -96.8794 653.885 53.4584 675.286C155.591 689.825 259.332 688.614 361.103 671.732V671.732C482.223 651.639 605.99 653.781 726.342 678.052L832.542 699.469"
              stroke="#0078B9"
              strokeWidth="18"
            />
            <path
              id="Vector 4"
              d="M-265.38 593.478C-261.344 594.235 -95.3091 617.919 55.0288 639.32C157.162 653.859 260.902 652.649 362.673 635.766V635.766C483.793 615.674 607.561 617.816 727.913 642.087L834.113 663.503"
              stroke="#CF202E"
              strokeWidth="18"
            />
            <path
              id="Vector 5"
              d="M-266.165 611.461C-262.129 612.218 -96.0943 635.902 54.2436 657.303C156.376 671.842 260.117 670.632 361.888 653.749V653.749C483.008 633.657 606.775 635.798 727.128 660.069L833.327 681.486"
              stroke="white"
              strokeWidth="18"
            />
          </g>
          <text
            x="35"
            y="86"
            width="730"
            height="78"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            This year, you rode the rails
          </text>
          <text
            x="35"
            y="210"
            width="730"
            height="203"
            className="length"
            style={{
              fontSize: "140px",
              fontWeight: "700",
              fontStyle: "italic",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            {prettyPrintNum(distance)}
            <tspan
              style={{
                fontSize: "48px",
              }}
            >
              mi
            </tspan>
          </text>
          <text
            x="35"
            y="285"
            width="730"
            height="78"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            thats...
          </text>
          <text
            x="60"
            y="357"
            width="730"
            height="78"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            &#x2022; 11,428,570 sheppeys
          </text>
          <text
            x="60"
            y="429"
            width="730"
            height="78"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            &#x2022; 6,462,669,677 horse-lengths
          </text>
          <text
            x="60"
            y="501"
            width="730"
            height="78"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            &#x2022; 175,999,926 football fields
          </text>
          <text
            x="60"
            y="574"
            width="730"
            height="78"
            style={{
              fontSize: "48px",
              fontWeight: "400",
              fontFamily: "'Kanit', sans-serif",
              fill: "#fff",
            }}
          >
            &#x2022; 9,457,279,760 smoots
          </text>

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
          <defs>
            <clipPath id="clip0_413_50">
              <rect width="800" height="800" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </div>
      <button
        onClick={() => {
          const svgElement =
            document.getElementById("distance-svg").parentElement;
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
              a.download = "amtraker-backtrak-distance.png";
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

export default Distance;
