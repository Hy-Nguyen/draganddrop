export default function Navbar() {
  return (
    <nav className="bg-slate-wd border-gray-200">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <div>Title</div>
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="bg--slate-wd mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse">
            <li>
              <a href="#" className="text-green-wd block rounded px-3 py-2" aria-current="page">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-green-light-wd block rounded px-3 py-2">
                About
              </a>
            </li>
            <li>
              <a href="#" className="text-green-light-wd block rounded px-3 py-2">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-green-light-wd block rounded px-3 py-2">
                Pricing
              </a>
            </li>
            <li>
              <a href="#" className="text-green-light-wd block rounded px-3 py-2">
                Contact
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
