const TechStackItem = ({ icon, name }) => {
  return (
    <div className="bg-[#16181c]/50 backdrop-blur-sm border border-teal-500/20 rounded-lg p-5 flex flex-col items-center min-w-[140px] tech-stack-item">
      <div className="w-12 h-12 mb-4 flex items-center justify-center bg-teal-500/10 rounded-full">
        <div className="text-teal-400">{icon}</div>
      </div>
      <h5 className="text-white font-medium text-center">{name}</h5>
    </div>
  )
}

export default TechStackItem
