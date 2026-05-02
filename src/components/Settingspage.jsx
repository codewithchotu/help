import React, { useState } from "react";
import GlassInput from "./Shared/GlassInput";
import ContactList from "./Shared/ContactList";

export default function SettingsPage(){
  const [settings, setSettings] = useState({
    name: "Demo User",
    email: "demo@demo.com",
    phone: "",
    bloodType: "A+",
    emergencyContacts: [{name:'',phone:''},{name:'',phone:''}],
    animatedBackground: true
  });

  const update = (k, v) => setSettings(s => ({...s, [k]: v}));

  return (
    <div className="card">
      <h2 style={{marginTop:0}}>Settings</h2>

      <div className="settings-grid" style={{marginTop:8}}>
        <div>
          <div className="subheading">Account & Privacy</div>
          <GlassInput label="Full Name" value={settings.name} onChange={v=>update('name',v)} />
          <GlassInput label="Email" value={settings.email} onChange={v=>update('email',v)} />
          <GlassInput label="Phone" value={settings.phone} onChange={v=>update('phone',v)} />
          <GlassInput label="Blood Type" value={settings.bloodType} onChange={v=>update('bloodType',v)} />
        </div>

        <div>
          <div className="subheading">Emergency Contacts (max 2)</div>
          <ContactList contacts={settings.emergencyContacts} onUpdate={(c)=>update('emergencyContacts',c)} />
        </div>

        <div>
          <div className="subheading">Display & UI</div>
          <label style={{display:'flex',alignItems:'center',gap:8}}>
            <input type="checkbox" checked={settings.animatedBackground} onChange={(e)=>update('animatedBackground', e.target.checked)} />
            <span>Animated Background</span>
          </label>
        </div>
      </div>
    </div>
  );
}
