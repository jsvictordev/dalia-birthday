export function World() {
  return (
    <svg
      className="world"
      viewBox="0 0 600 540"
      role="img"
      aria-label="Dalia, un avatar original de bloques, sobre una isla flotante con estrellas y regalos"
    >
      <defs>
        <linearGradient id="island" x2="0" y2="1">
          <stop stopColor="#ae8af7" />
          <stop offset="1" stopColor="#6d45bd" />
        </linearGradient>
        <linearGradient id="hair" x2="1" y2="1">
          <stop stopColor="#51303e" />
          <stop offset="1" stopColor="#271e39" />
        </linearGradient>
        <filter id="shadow">
          <feGaussianBlur stdDeviation="13" />
        </filter>
      </defs>
      <ellipse
        cx="310"
        cy="486"
        rx="165"
        ry="18"
        fill="#7958b6"
        opacity=".16"
        filter="url(#shadow)"
      />
      <g className="float-slow">
        <path d="M102 345 313 294 514 355 305 425Z" fill="#dccbff" />
        <path d="M102 345v54l203 69v-43Z" fill="url(#island)" />
        <path d="m305 425 209-70v50l-209 63Z" fill="#7953c0" />
        <path d="m102 345 203 67 209-57-201-61Z" fill="#c8b2f5" />
        <path
          d="m140 343 166 50 169-39M194 327l170 51M250 312l170 49M191 374l170-64M250 394l170-65"
          fill="none"
          stroke="#e4d5ff"
          strokeWidth="2"
          opacity=".6"
        />
        <g strokeLinejoin="round">
          <path d="m252 302 40 8-4 79-42-10Z" fill="#eae5ff" />
          <path d="m307 311 41-7 13 75-42 11Z" fill="#fbf7ff" />
          <path d="m244 373 45 8v19l-53-9Z" fill="#a27ae8" />
          <path d="m317 381 45-8 10 18-55 10Z" fill="#8a63d4" />
          <path d="m250 208 82-3 25 106-112 3Z" fill="#a883ee" />
          <path d="m250 208 17 24 52-1 13-26" fill="#c4a6ff" />
          <path d="m268 255 19-15 18 13 18-3-12 27-27 5Z" fill="#f7dc6c" />
          <path d="m246 214-28 7-35 64 26 15 48-61Z" fill="#b18ef0" />
          <path d="m183 285 26 15-9 23-28-14Z" fill="#f4bd9b" />
          <path d="m332 211 25 7 30-53-25-16-34 52Z" fill="#b18ef0" />
          <path d="m362 149 25 16 13-27-28-14Z" fill="#f4bd9b" />
          <path
            d="m247 108 81-8 26 37-4 91-29-13-78 9-19-29 5-63Z"
            fill="url(#hair)"
          />
          <path d="m249 133 72-3 6 67-67 10-20-21Z" fill="#ffd1ae" />
          <path
            d="m234 142 12-35 73-9 23 34-46-5-25 18-1-20-14 21Z"
            fill="#493044"
          />
          <path d="m326 134 17 2 1 95-20-12Z" fill="#38273f" />
          <ellipse cx="267" cy="165" rx="3.6" ry="5" fill="#35243e" />
          <ellipse cx="305" cy="161" rx="3.6" ry="5" fill="#35243e" />
          <path
            d="M279 180q11 13 21-3"
            fill="none"
            stroke="#9b4d61"
            strokeWidth="3.5"
            strokeLinecap="round"
          />
          <path d="m240 120 7-19 25 2-6 20Z" fill="#ff70ae" />
          <circle cx="253" cy="112" r="6" fill="#ffd5e8" />
        </g>
        <g transform="translate(397 305)">
          <path d="m0 0 38-12 35 13-37 13Z" fill="#ffe480" />
          <path d="m0 0 36 14v49L0 48Z" fill="#ffbe51" />
          <path d="m36 14 37-13v49L36 63Z" fill="#f09d48" />
          <path
            d="m15-5 37 14v48M54-6 16 7v48"
            fill="none"
            stroke="#fff0bd"
            strokeWidth="9"
          />
          <path
            d="M34-9C0-39 9-49 29-28L36-9c30-40 52-18 0 0"
            fill="none"
            stroke="#f794bd"
            strokeWidth="7"
          />
        </g>
        <g transform="translate(149 289)">
          <path d="m0 0 27-8 26 10-27 9Z" fill="#9ce7f9" />
          <path d="M0 0v34l26 11V11Z" fill="#55bfdf" />
          <path d="m26 11 27-9v33l-27 10Z" fill="#3395b9" />
          <path
            d="m10-3 28 10v34"
            fill="none"
            stroke="#e7fbff"
            strokeWidth="7"
          />
        </g>
      </g>
      <g fill="#ffd75d">
        <path d="m115 121 8 18 19 3-14 13 3 20-17-10-18 9 4-20-13-14 20-2Z" />
        <path d="m448 228 6 13 15 3-11 10 2 15-13-7-13 7 3-15-10-11 15-1Z" />
      </g>
      <g className="float-reverse">
        <path d="m418 89 38-11 23 23-38 12Z" fill="#91d8f4" />
        <path d="m418 89v35l23 23v-34Z" fill="#58b5e2" />
        <path d="m441 113 38-12v35l-38 11Z" fill="#3b91c7" />
      </g>
      <g fill="#aa87eb">
        <path d="m74 247 24-8 18 15-24 8Z" />
        <path d="M74 247v22l18 15v-22Z" />
        <path d="m92 262 24-8v22l-24 8Z" />
      </g>
      <g fill="#fff">
        <path d="m369 72 4 12 12 4-12 4-4 12-4-12-12-4 12-4Z" />
        <path d="m179 214 3 8 8 3-8 3-3 8-3-8-8-3 8-3Z" />
      </g>
    </svg>
  );
}
