import { useNavigate } from 'react-router-dom'
import './App.css'
import { Button } from './components/ui/button'

function App() {
  const navigate = useNavigate()
  return (
    <div className='mx-56 my-20 flex flex-col items-center gap-6'>
      <h1 className='font-extrabold text-[36px] text-center mt-16'><span className='text-[#f56551]'>
        Discover Your Best Tag Maker Application:{""}
      </span>
        <p>
          Where Creativity Meets Precision!
        </p>
      </h1>
      <p className='text-center'>Discover the perfect tool for creating stunning and personalized tags with ease. Our Tag Maker application combines creativity and precision, offering a wide range of templates, designs, and customization options. Whether for personal use or professional branding, this app ensures your tags stand out with style and impact. Explore the ultimate solution for all your tagging needs today!</p>

      <Button onClick={() => navigate('/create-tag')}> Get Started, It&#39;s Free</Button>


    </div>
  )
}

export default App
