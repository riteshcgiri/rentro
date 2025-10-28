    const SpinnerLoader = ({width, height, className}) => (
    <svg width={width} height={height} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
        <circle cx="25" cy="25" r="20" className={className} strokeWidth="4" strokeLinecap="round" strokeDasharray="100" strokeDashoffset="100">
            <animate attributeName="stroke-dashoffset" values="100;0;100" dur="1.5s" repeatCount="indefinite" />
            <animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="2s" repeatCount="indefinite" />
        </circle>
    </svg>
);

export default SpinnerLoader;
