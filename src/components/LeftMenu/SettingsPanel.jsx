import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { handleError } from '@/utils/errorHandling';
import { toast } from 'react-toastify';
import { User, Settings, Sun, Moon } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SettingsPanel = ({ currentUser }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const { isDarkMode, toggleDarkMode, isDyslexicFont, toggleDyslexicFont } = useTheme();
  
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [colorblindMode, setColorblindMode] = useState('none');

  const handleSignOut = async () => {
    try {
      await logout();
      toast.success("Signed out successfully");
      navigate('/signin');
    } catch (error) {
      handleError(error, "Error signing out");
    }
  };

  return (
    <div className="mt-auto pt-4 border-t border-border">
      <div className="flex justify-between items-center mb-2">
        <Button variant="ghost" size="icon" onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}>
          <User className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setIsSettingsOpen(!isSettingsOpen)}>
          <Settings className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={toggleDarkMode}>
          {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </Button>
      </div>
      {isUserMenuOpen && (
        <div className="mt-2 p-2 rounded-md bg-secondary">
          <p className="text-sm mb-2">{currentUser.email}</p>
          <Button variant="ghost" className="w-full justify-start" onClick={handleSignOut}>
            Sign Out
          </Button>
        </div>
      )}
      {isSettingsOpen && (
        <div className="mt-2 p-2 rounded-md bg-secondary">
          <div className="mb-2">
            <label className="block text-sm mb-1">Colorblind Mode:</label>
            <Select value={colorblindMode} onValueChange={setColorblindMode}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select colorblind mode" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">None</SelectItem>
                <SelectItem value="protanopia">Protanopia</SelectItem>
                <SelectItem value="deuteranopia">Deuteranopia</SelectItem>
                <SelectItem value="tritanopia">Tritanopia</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm">Dyslexic Font:</span>
            <Switch checked={isDyslexicFont} onCheckedChange={toggleDyslexicFont} />
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsPanel;