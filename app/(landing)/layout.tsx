const LandingLayout = ({
    children
}:{
    children: React.ReactNode
}) => {
  return (
    <main className="min-h-screen bg-[#111827] overflow auto">
        <div className="mx-auto max-w-screen-xl h-full w-full">
            {children}
        </div>
    </main>
  )
}

export default LandingLayout