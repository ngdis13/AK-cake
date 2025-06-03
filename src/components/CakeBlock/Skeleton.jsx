import React from "react"
import ContentLoader from "react-content-loader"

const Skeleton = (props) => (
  <ContentLoader 
    className="cake-block"
    speed={2}
    width={280}
    height={460}
    viewBox="0 0 280 460"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="177" y="114" rx="0" ry="0" width="2" height="16" /> 
    <rect x="28" y="133" rx="0" ry="0" width="1" height="0" /> 
    <rect x="0" y="4" rx="10" ry="10" width="280" height="207" /> 
    <rect x="0" y="233" rx="10" ry="10" width="280" height="28" /> 
    <rect x="0" y="277" rx="10" ry="10" width="280" height="88" /> 
    <rect x="0" y="382" rx="10" ry="10" width="95" height="30" /> 
    <rect x="129" y="380" rx="25" ry="25" width="152" height="40" />
  </ContentLoader>
)

export default Skeleton
