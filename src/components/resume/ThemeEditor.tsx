import { ResumeTheme } from '@/types/resume';
import { useResumeStore } from '@/store/resumeStore';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { cn } from '@/lib/utils';

interface ThemeEditorProps {
  theme: ResumeTheme;
}

const colors = [
  { value: '#1e293b', label: 'Slate' },
  { value: '#0f172a', label: 'Navy' },
  { value: '#18181b', label: 'Zinc' },
  { value: '#1c1917', label: 'Stone' },
  { value: '#dc2626', label: 'Red' },
  { value: '#ea580c', label: 'Orange' },
  { value: '#16a34a', label: 'Green' },
  { value: '#2563eb', label: 'Blue' },
];

const fonts = [
  { value: 'inter', label: 'Inter', family: 'Inter, sans-serif' },
  { value: 'georgia', label: 'Georgia', family: 'Georgia, serif' },
  { value: 'roboto', label: 'Roboto', family: 'Roboto, sans-serif' },
  { value: 'merriweather', label: 'Merriweather', family: 'Merriweather, serif' },
];

export function ThemeEditor({ theme }: ThemeEditorProps) {
  const updateTheme = useResumeStore((state) => state.updateTheme);

  return (
    <div className="space-y-6">
      {/* Color picker */}
      <div className="space-y-3">
        <Label>Accent Color</Label>
        <div className="flex flex-wrap gap-2">
          {colors.map((color) => (
            <button
              key={color.value}
              onClick={() => updateTheme({ primaryColor: color.value })}
              className={cn(
                "w-10 h-10 rounded-lg transition-all",
                theme.primaryColor === color.value
                  ? "ring-2 ring-offset-2 ring-accent scale-110"
                  : "hover:scale-105"
              )}
              style={{ backgroundColor: color.value }}
              title={color.label}
            />
          ))}
        </div>
      </div>

      {/* Font family */}
      <div className="space-y-3">
        <Label>Font Family</Label>
        <RadioGroup
          value={theme.fontFamily}
          onValueChange={(value) => updateTheme({ fontFamily: value as ResumeTheme['fontFamily'] })}
          className="grid grid-cols-2 gap-2"
        >
          {fonts.map((font) => (
            <div key={font.value}>
              <RadioGroupItem
                value={font.value}
                id={font.value}
                className="peer sr-only"
              />
              <Label
                htmlFor={font.value}
                className={cn(
                  "flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all",
                  theme.fontFamily === font.value
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
                style={{ fontFamily: font.family }}
              >
                {font.label}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Font size */}
      <div className="space-y-3">
        <Label>Font Size</Label>
        <RadioGroup
          value={theme.fontSize}
          onValueChange={(value) => updateTheme({ fontSize: value as ResumeTheme['fontSize'] })}
          className="flex gap-2"
        >
          {(['small', 'medium', 'large'] as const).map((size) => (
            <div key={size} className="flex-1">
              <RadioGroupItem
                value={size}
                id={`size-${size}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`size-${size}`}
                className={cn(
                  "flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all capitalize",
                  theme.fontSize === size
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                {size}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      {/* Spacing */}
      <div className="space-y-3">
        <Label>Spacing</Label>
        <RadioGroup
          value={theme.spacing}
          onValueChange={(value) => updateTheme({ spacing: value as ResumeTheme['spacing'] })}
          className="flex gap-2"
        >
          {(['compact', 'comfortable', 'spacious'] as const).map((spacing) => (
            <div key={spacing} className="flex-1">
              <RadioGroupItem
                value={spacing}
                id={`spacing-${spacing}`}
                className="peer sr-only"
              />
              <Label
                htmlFor={`spacing-${spacing}`}
                className={cn(
                  "flex items-center justify-center p-3 rounded-lg border-2 cursor-pointer transition-all capitalize",
                  theme.spacing === spacing
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                {spacing}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
}
