import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PricingTable from '../components/blocks/PricingTable.vue';

describe('PricingTable', () => {
  it('renders with default slots', () => {
    const wrapper = mount(PricingTable);
    
    // Verificar que el componente se renderiza correctamente
    expect(wrapper.exists()).toBe(true);
    
    // Verificar que los slots por defecto están presentes
    expect(wrapper.text()).toContain('Planes y precios');
    expect(wrapper.text()).toContain('Elige el plan que mejor se adapte a tus necesidades');
    
    // Verificar que los planes por defecto están presentes
    expect(wrapper.text()).toContain('Básico');
    expect(wrapper.text()).toContain('Profesional');
    expect(wrapper.text()).toContain('Empresarial');
    
    // Verificar que los precios por defecto están presentes
    expect(wrapper.text()).toContain('$9');
    expect(wrapper.text()).toContain('$29');
    expect(wrapper.text()).toContain('$99');
  });
  
  it('renders with custom slots', () => {
    const wrapper = mount(PricingTable, {
      slots: {
        title: 'Título personalizado',
        description: 'Descripción personalizada',
        'basic-title': 'Plan Básico',
        'basic-price': '€10',
        'pro-title': 'Plan Pro',
        'pro-price': '€30',
        'enterprise-title': 'Plan Enterprise',
        'enterprise-price': '€100'
      }
    });
    
    // Verificar que los slots personalizados se renderizan correctamente
    expect(wrapper.text()).toContain('Título personalizado');
    expect(wrapper.text()).toContain('Descripción personalizada');
    expect(wrapper.text()).toContain('Plan Básico');
    expect(wrapper.text()).toContain('€10');
    expect(wrapper.text()).toContain('Plan Pro');
    expect(wrapper.text()).toContain('€30');
    expect(wrapper.text()).toContain('Plan Enterprise');
    expect(wrapper.text()).toContain('€100');
  });
  
  it('applies the correct variant class', async () => {
    const wrapper = mount(PricingTable, {
      props: {
        variant: 'compact'
      }
    });
    
    // Verificar que la variante se aplica correctamente
    // Nota: Esto dependerá de cómo implementes las variantes en el componente
    // Este es solo un ejemplo y puede necesitar ajustes
    
    // Cambiar la variante
    await wrapper.setProps({ variant: 'feature-rich' });
    
    // Verificar que la variante se actualizó correctamente
    // Esto dependerá de la implementación específica
  });
}); 