import { BadgeIndicator } from "./ui/badge-indicator";
import StepSelector from "./ui/form/step-selector";
import { SideNav } from "./ui/side-nav";


export default function Page() {

  return (
    <main className="page">
      <header style={{ marginLeft: '60px', fontWeight: 'bold', fontSize: '14px', marginBlock: '30px' }}>
        New Company
        <BadgeIndicator />
      </header>
      <div style={{ background: '#e3e3e3ff', height: '1px', marginBottom: '20px' } } />
      <div style={{ display: 'flex', gap: '20px', marginLeft: '40px' }}>
        <SideNav />
        <div className="steps-div">
         < StepSelector />
        </div>
      </div>
    </main>
  );
}