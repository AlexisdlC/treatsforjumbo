const [formData, setFormData] = React.useState({
    name: "",
    catName: "",
    city: "",
    country: ""
  })

  function handleChange(event){
    const {name, value} = event.target
    console.log(name, value)
    setFormData(prevFormData => {
      return {
        ...prevFormData,
        [name]: value
      }
    })
  }

  return (
    <main className='main'>
      <form className='form'>
        <h1 className='form-title'>Settings</h1>
        <label className='form--label' htmlFor="name">Your Name:</label>
        <input 
          type="text" 
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          autoComplete="off"
          className='form--input' 
        />
        <label className='form--label' htmlFor="catName">Your Cat's Name:</label>
        <input 
          type="text" 
          id="catName"
          name="catName"
          value={formData.catName}
          onChange={handleChange}
          autoComplete="off"
          className='form--input' 
        />
        <label className='form--label' htmlFor="city">City:</label>
        <input 
          type="text" 
          id="city"
          name="city"
          value={formData.city}
          onChange={handleChange}
          autoComplete="off"
          className='form--input' 
        />
        <label className='form--label' htmlFor="country">Country:</label>
        <input 
          type="text" 
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          autoComplete="off"
          className='form--input' 
        />
        <button className='form--button'>Save</button>
      </form>
    </main>
  );