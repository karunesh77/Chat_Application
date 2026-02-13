import { useState } from 'react';
import {Loader2} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


interface FormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  pic: File | null;
}

function SignupForm() {
const navigate = useNavigate();
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    pic:null
  });
  
 const [loader, setLoader] = useState(false);
 const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const handleInputChange = (e:any) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

}
  

  const handleFileChange = (e:any) => {

    if(!e.target.files || e.target.files.length === 0){
      setFormData(prev => ({
        ...prev,
        pic: null
      }));
      return;
    }
    
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        pic: file
      }));
  };

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);

    console.log(file);
}

  

  const handleSubmit = async (e:any) => {
    try {
      e.preventDefault();
      console.log("Submitting form with data:", formData);
  
      setLoader(true);
      const form = new FormData();
      form.append('name', formData.name);
      form.append('email', formData.email);
      form.append('password', formData.password);
     if(formData.pic){
      form.append('pic', formData.pic);
     }

      const resp = await fetch('http://localhost:5000/api/user/', {
        method: 'POST',
        
        body: form
      });
      const data = await resp.json();
      console.log(data);

      setLoader(false);

      if (data.succes === true) {
        localStorage.setItem('userInfo', JSON.stringify(data));
        navigate('/login');
      }
    } catch (error) {
      setLoader(false);
      
      console.error('Error:', error);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center p-4">
      <div className="bg-slate-800/90 backdrop-blur-sm rounded-2xl shadow-2xl w-full max-w-md p-8 border border-slate-700/50">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-blue-600 to-cyan-600 rounded-xl mb-4 shadow-lg">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-white mb-2">Create Account</h2>
          <p className="text-slate-400">Join us today and get started</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-700/50 text-white placeholder-slate-400 
               
              }`}
              placeholder="John Doe"
            />
           
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-700/50 text-white placeholder-slate-400`
               
              }
              placeholder="john@example.com"
            />
        
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-700/50 text-white placeholder-slate-400`
                
              }
              placeholder="••••••••"
            />
           
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300 mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className={`w-full px-4 py-2.5 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-slate-700/50 text-white placeholder-slate-400`} 
              placeholder="••••••••"
            />
          
          </div>

          {/* Profile Picture Upload */}
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Profile Picture
            </label>
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0">
                {previewUrl ? (
                  <div className="relative">
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="h-24 w-24 rounded-full object-cover ring-4 ring-blue-500/50"
                    />
                    <div className="absolute -bottom-1 -right-1 bg-linear-to-br from-blue-600 to-cyan-600 rounded-full p-1.5 shadow-lg">
                      <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                ) : (
                  <div className="h-24 w-24 rounded-full bg-slate-700 flex items-center justify-center ring-4 ring-slate-600">
                    <svg className="h-10 w-10 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                )}
              </div>
              <label className="cursor-pointer">
                <span className="px-5 py-2.5 bg-linear-to-r from-blue-600 to-cyan-600 text-white rounded-xl text-sm font-medium hover:from-blue-700 hover:to-cyan-700 transition-all shadow-md hover:shadow-lg inline-block">
                  Choose File
                </span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>
         
          </div>

          {/* Submit Button */}
         {loader ? ( <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-cyan-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Loader2 className="animate-spin h-5 w-5 mx-auto" />
          </button>) : ( <button
            type="submit"
            className="w-full bg-linear-to-r from-blue-600 to-cyan-600 text-white py-3.5 rounded-xl font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            Sign Up
          </button>)}
        </form>

        <p className="text-center text-slate-400 text-sm mt-6">
          Already have an account?{' '}
          <a href="#" className="text-blue-400 font-semibold hover:text-cyan-400 transition-colors">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
};



export  {SignupForm};
