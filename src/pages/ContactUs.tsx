
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import NavBar from "@/components/NavigationBar"

export default function ContactUs() {
  return (
    <>
      <NavBar />
      <div className="w-full max-w-6xl mx-auto py-12 md:py-44 px-4 md:px-6">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h1 className="text-3xl font-bold mb-4">Get in Touch</h1>
            <p className="text-gray-500 dark:text-gray-400 mb-8">
              Have a question or just want to say hello? Fill out the form and we'll get back to you
              as soon as possible.
            </p>
            <form className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Enter your name" />
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input id="email" placeholder="Enter your email" type="email" />
              </div>
              <div>
                <Label htmlFor="message">Message</Label>
                <Textarea className="min-h-[120px]" id="message" placeholder="Enter your message" />
              </div>
              <Button className="w-full" type="submit">
                Submit
              </Button>
            </form>
          </div>
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-bold mb-2">Our Office</h2>
              <div className="text-gray-500 dark:text-gray-400">
                <p>123 Main St.</p>
                <p>Anytown, USA 12345</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Contact Us</h2>
              <div className="text-gray-500 dark:text-gray-400">
                <p>Phone: (123) 456-7890</p>
                <p>Email: info@company.com</p>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold mb-2">Business Hours</h2>
              <div className="text-gray-500 dark:text-gray-400">
                <p>Monday - Friday: 9am - 5pm</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
