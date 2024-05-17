import { useDispatch, useSelector } from "react-redux";
import Navbar from "./NavBar";

import { formatINRCurrency } from "../lib/currencyFormatter";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import { Button } from "./ui/button";
import { Landmark } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {

  const images = [
    {
      url: 'https://iihttrainingawsbucket.s3.amazonaws.com/bank.jpg',
      alt: 'Welcome to ABC Bank'
    },
    {
      url: 'https://www.shutterstock.com/shutterstock/photos/1424951477/display_1500/stock-vector-online-banking-vector-isometric-illustration-1424951477.jpg',
      alt: 'Digital Banking'
    },
    {
      url: 'https://static.vecteezy.com/system/resources/previews/003/793/320/original/mortgage-loan-debt-instruments-that-are-secured-by-property-assets-such-as-real-estate-services-rent-buying-home-or-auction-house-background-illustration-vector.jpg',
      alt: 'Loans and Mortgages'
    },
    {
      url: 'https://st.depositphotos.com/6464944/51688/v/1600/depositphotos_516889908-stock-illustration-client-character-sitting-and-talking.jpg',
      alt: ' Customer Service'
    },
    {
      url: 'https://cdni.iconscout.com/illustration/premium/preview/investment-banker-providing-clients-with-investment-advice-and-services-9026202-7350309.png?f=webp&h=700',
      alt: 'Investment Services'
    }
  ];
  return (
    <>
      <div className="p-4">

        <div className="flex flex-col h-96 mb-8 w-full justify-center items-center rounded-lg bg-gray-100 text-center">
          <Landmark size={143} />
          <h1 className="text-7xl font-semibold mb-4">Welcome to Bengaluru Bank</h1>
          <p className="text-xl mr-32 ml-32 mb-4">
            Your trusted financial partner, committed to helping you achieve your financial goals with our wide range of services and personalized support.
          </p>
          <Link to="/signUp"><Button className=" text-white px-6 py-3 rounded-md">Get Started</Button></Link>
        </div>

        <Carousel className="w-full max-w-4xl mx-auto mb-8">
          <CarouselContent>
            {images.map((img, index) => (
              <CarouselItem key={index}>
                <div className="p-1">
                  <Card>
                    <CardContent className="flex h-96 items-center justify-center p-6">
                      <img
                        src={img.url}
                        alt={`Carousel Image ${img.alt}`}
                        className="w-full h-full object-cover"
                      />
                    </CardContent>
                  </Card>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>

        <section className="w-full bg-white p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Our Services</h2>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">Personal Banking: Savings accounts, checking accounts, and personal loans.</li>
              <li className="mb-2">Business Banking: Business accounts, loans, and merchant services.</li>
              <li className="mb-2">Loans and Mortgages: Home loans, auto loans, and mortgage refinancing.</li>
              <li className="mb-2">Credit Cards: A variety of credit card options with competitive rates and rewards.</li>
              <li className="mb-2">Investment Services: Financial planning, investment advice, and retirement accounts.</li>
              <li className="mb-2">Digital Banking: Online banking, mobile app, and 24/7 customer support.</li>
              <li className="mb-2">Wealth Management: Comprehensive wealth management services to help you grow and protect your assets.</li>
            </ul>
            <p>
              Explore our wide range of services designed to meet all your financial needs. Whether you're looking for a simple savings account or complex investment advice, Bengaluru Bank has you covered.
            </p>
          </div>
        </section>


        <section className="w-full bg-gray-100 p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Contact Us</h2>
            <p className="mb-4">We'd love to hear from you! Whether you have a question about our services, need assistance, or want to provide feedback, we're here to help.</p>
            <p className="mb-2"><strong>Email:</strong> contact@bengalurubank.com</p>
            <p className="mb-2"><strong>Phone:</strong> 123-456-7890</p>
            <p className="mb-2"><strong>Address:</strong> 123 Main Street, City, Country</p>
            <p className="mb-4"><strong>Working Hours:</strong> Mon-Fri, 9 AM - 5 PM</p>
            <p>
              You can also visit one of our branches. Find the nearest branch using our branch locator tool on our website.
            </p>
          </div>
        </section>


        <section className="w-full bg-white p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Why Choose Us</h2>
            <p className="mb-4">
              At Bengaluru Bank, we prioritize our customers and their financial well-being. Here are some reasons why you should choose us:
            </p>
            <ul className="list-disc list-inside mb-4">
              <li className="mb-2">Experienced Professionals: Our team of experts is dedicated to providing you with the best financial advice and services.</li>
              <li className="mb-2">Customer-Centric Approach: We focus on understanding your needs and providing personalized solutions.</li>
              <li className="mb-2">Competitive Rates: We offer competitive rates on loans, mortgages, and investment products.</li>
              <li className="mb-2">Convenient Banking: Enjoy the convenience of our online and mobile banking services, available 24/7.</li>
              <li className="mb-2">Community Involvement: We are committed to supporting the communities we serve through various initiatives and programs.</li>
              <li className="mb-2">Secure Banking: We use advanced security measures to protect your personal and financial information.</li>
            </ul>
            <p>
              Join Bengaluru Bank today and experience the difference. Let us help you achieve your financial goals with confidence and ease.
            </p>
          </div>
        </section>

        <section className="w-full bg-gray-100 p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">About Us</h2>
            <p className="mb-4">
              Welcome to Bengaluru Bank, your trusted financial partner. Established in 1990, we have been serving the community for over 30 years with a commitment to excellence and customer satisfaction. Our mission is to provide exceptional service and innovative solutions to help you achieve your financial goals.
            </p>
            <p className="mb-4">
              With a network of over 200 branches nationwide, we offer a wide range of banking services tailored to meet your needs. From personal banking to business solutions, our experienced team is here to assist you every step of the way.
            </p>
            <p>
              At Bengaluru Bank, we believe in building long-term relationships with our customers. We strive to understand your unique needs and provide personalized service to help you succeed financially.
            </p>
          </div>
        </section>

        <section className="w-full bg-gray-100 p-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-4">Customer Testimonials</h2>
            <p className="mb-4">
              "Bengaluru Bank has been a reliable partner in my financial journey. Their services are top-notch and their staff is always ready to help." - John Doe
            </p>
            <p className="mb-4">
              "I appreciate the personalized service I receive at Bengaluru Bank. They truly care about their customers and go above and beyond to meet their needs." - Jane Smith
            </p>
            <p className="mb-4">
              "Thanks to Bengaluru Bank, I was able to get a mortgage for my dream home with ease. Their team guided me through the process and made it stress-free." - Michael Brown
            </p>
            <p>
              "Bengaluru Bank's digital banking services are fantastic. I can manage my accounts, pay bills, and transfer money anytime, anywhere." - Sarah Johnson
            </p>
          </div>
        </section>
      </div>

    </>
  );
};
export default Home;
