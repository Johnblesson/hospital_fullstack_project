import maintainance from '../public/images/maintainance.gif'
import Image from 'next/image';

const ErrorPage = function () {

    return (  
      <>
        <div className="flex flex-col text-center p-5">
          { 
              <div className="flex flex-col  p-5">
                  <h6 className="mb-5 center text-2xl font-bold ml-5">
                            Fail Due to Technical Error
                          </h6>
                      <div className="divider"></div> 
                      <div className="grid place-content-center mt-10">
                          <Image src={maintainance} width="100"
                            height="100" alt="Maintenance page" className="text-center" />
                      </div> 
              </div>   
            
          } 
        </div>     
      </>
    )
  }
  
  export default ErrorPage;